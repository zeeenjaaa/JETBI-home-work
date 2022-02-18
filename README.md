# JETBI-home-work
JETBI-home-work #5
## ДЗ:
Теория:
### 1. Изучить и понять самостоятельно разницу биндингов в SAPUI5.
## Worklist:
### 1. Создать кнопку для обновления( refresh) записей в таблице
```xml
<Button type="Emphasized" text="{i18n>tRefreshButton}" press="onPressRefreshButton" icon ="sap-icon://refresh"/>
```
```javascript
onPressRefreshButton : function (oEvent){
  this.onRefresh();
}
....
onRefresh: function() {
  var oTable = this.byId("table");
  oTable.getBinding("items").refresh();
}
```
### 3. Создать 3 кнопки: Submit Changes, Reset Changes, Refresh. Binding: two-way.
```javascript
onPressRefreshButton: function(oEvent) {
    this.onRefresh();
  },
  onPressResetButton: function(oEvent) {
    this.getModel().resetChanges();
  },
   onPressSubmitButton: function(oEvent) {
    this.getModel().submitChanges();
  }
```
### 4. Реализовать возможность изменения полей MaterialText, GroupID, SubGroupID. При редактировании в попапе не должно быть запросов. Запросы должны быть только по нажатию на кнопку "submit changes"
```javascript
onPressEditButton: function(oEvent) {
if (!this.oEditMaterialDialog) {
  this.oEditMaterialDialog = new Dialog({
    title: this.getView().getModel("i18n").getResourceBundle().getText("tEditDialogTitle").concat(" `{MaterialText}`"),
    content: [
      new sap.m.Label({
        text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogLabelMaterialText"),
        labelFor: "MaterialTextEdit"
      }),
      new sap.m.Input("MaterialTextEdit", {
        width: "100%",
        maxLength: 10,
        value: "{MaterialText}",
        liveChange: function() {
          this.checkBeginButtonEnabled(oEvent);
        }.bind(this)

      }),
      new sap.m.Label({
        text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogLabelGroupIDText"),
        labelFor: "GroupIdEdit"
      }),
      new sap.m.Input("GroupIdEdit", {
        width: "100%",
        maxLength: 10,
        value: "{GroupID}",
        liveChange: function() {
          this.checkBeginButtonEnabled(oEvent);
        }.bind(this)
      }),
      new sap.m.Label({
        text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogLabelSubGroupIDText"),
        labelFor: "GroupIdEdit"
      }),
      new sap.m.Input("SubGroupIdEdit", {
        width: "100%",
        maxLength: 10,
        value: "{SubGroupID}",
        liveChange: function() {
          this.checkBeginButtonEnabled(oEvent);
        }.bind(this)
      })
    ],
    buttons: [
      new sap.m.Button({
        enabled: true,
        type: "Accept",
        text: this.getView().getModel("i18n").getResourceBundle().getText("EditDialogButtonSubmitText"),
        press: function() {
          this.oEditMaterialDialog.close();
        }.bind(this),
        liveChange: function() {}.bind(this)
      }),

      new sap.m.Button({
        enabled: true,
        type: "Reject",
        text: this.getView().getModel("i18n").getResourceBundle().getText("EditDialogButtonResetText"),
        press: function() {
          this.getModel().resetChanges([oEvent.getSource().getBindingContext().getPath()]);
        }.bind(this)
      }),

      new sap.m.Button({
        enabled: true,
        type: "Emphasized",
        text: this.getView().getModel("i18n").getResourceBundle().getText("EditDialogButtonCancelText"),
        press: function() {
          this.getModel().resetChanges([oEvent.getSource().getBindingContext().getPath()]);
          this.oEditMaterialDialog.close();
        }.bind(this)
      })
    ]
  });

  // to get access to the controller's model
  this.getView().addDependent(this.oEditMaterialDialog);
}
this.oEditMaterialDialog.setBindingContext(oEvent.getSource().getBindingContext());

if (this._isAllowedEdit(oEvent.getSource().getParent().getBindingContext().getProperty("CreatedBy")) === true) {
  MessageToast.show("Allowed to Edit");
  this.oEditMaterialDialog.open();
} else {
  MessageToast.show("not allowed to edit");
}

}
```
## Object:
### 1. Создать json модель и сбиндить поля во view.xml (пример value="{json>/MaterialText}"
```xml
<VBox visible="true" class="sapUiContentPadding">
    <Title visible="true" text="MaterialText"/>
    <Title visible="{= !${objectView>/editMode}}" text="{json>/MaterialText}"/>
    <Input visible="{objectView>/editMode}" value="{json>/MaterialText}"/>
    <Title visible="true" text="GroupID "/>
    <Title visible="{= !${objectView>/editMode}}" text="{json>/GroupID}"/>
    <Input visible="{objectView>/editMode}" value="{json>/GroupID}"/>
    <Title visible="true" text="SubGroupID "/>
    <Title visible="{= !${objectView>/editMode}}" text="{json>/SubGroupID}"/>
    <Input visible="{objectView>/editMode}" value="{json>/SubGroupID}"/>
</VBox>
```
```javascript
```
### 2. Сделать кнопку редактирования, по нажатию на которую будет задавать editMode
```xml
<Button visible="{= !${objectView>/editMode}}" text="edit" press="onPressEdit" icon="sap-icon://edit" type="Transparent"/>
```
```javascript
onPressEdit: function() {
  this.getModel("objectView").setProperty("/editMode", true);
}
```
```javascript
oViewModel = new JSONModel({
  busy: true,
  delay: 0,
  editMode: false,
  elementalMaterial: null
});
}
```
### 3. Сделать сохранения изменений и ресет через json модель
```xml
<Button visible="{objectView>/editMode}" text="save" press="onPressSave" type="Accept"/>
<Button visible="{objectView>/editMode}" text="cancel" press="onPressCancel" type="Reject"/>
```
```javascript
onPressSave: function() {
  this.getModel("objectView").setProperty("/editMode", false);

  var oMaterial = this.getModel("json").getProperty("/");
  this.getModel("objectView").setProperty("/elementalMaterial",Object.assign({},oMaterial)); 
  var sPath = "/zjblessons_base_Materials('" + oMaterial.MaterialID+"')";
  this.getModel().update(sPath, {
        MaterialText: oMaterial.MaterialText,
        GroupID: oMaterial.GroupID,
        SubGroupID: oMaterial.SubGroupID,
        MaterialDescription: oMaterial.MaterialDescription
      }, {
        success: function(e) {
          MessageToast.show("updated good");
        },
        error: function(e) {
          MessageToast.show("update error");
        }
      }
    );},
    onPressCancel: function() {
      this.getModel("objectView").setProperty("/editMode", false);
      var oElementalMaterial = this.getModel("objectView").getProperty("/elementalMaterial");
      this.getModel("json").setData(oElementalMaterial);
    },
    setJsonModel: function(sMaterialID) {
      this.getModel().read("/zjblessons_base_Materials('" + sMaterialID + "')", {
        success: function(oData) {
          this.setModel(new JSONModel({}), "json");
          this.getModel("json").setData(oData);
          this.getModel("objectView").setProperty("/elementalMaterial",Object.assign({},oData));
          console.log(this.getModel("json").getData());
        }.bind(this),
        error: function() {
          MessageToast.show("error setting json model");
        }
      });
    }
```

## ДЗ*:
### 1. Сделать в попапе для редактирования возможность сделать Reset только для одной записи, а не для всех.
```javascript
new sap.m.Button({
  enabled: true,
  type: "Reject",
  text: this.getView().getModel("i18n").getResourceBundle().getText("EditDialogButtonResetText"),
  press: function() {
    this.getModel().resetChanges([oEvent.getSource().getBindingContext().getPath()]);
  }.bind(this)
}),
```
