# JETBI-home-work
JETBI-home-work-4

ДЗ:
### 1. Реализовать создание записей в сущности "/zjblessons_base_Materials". Задавать из UI поля MaterialsText, GroupID, SubGroupID, Version="A", Language="RU". Для задания каждого из полей использовать подписанный лейблом( Label) Input .
###### Кнопка
```xml
<Button type="Accept" text="{i18n>tCreateButton}" press="onPressCreateButton"/>
```
###### Функция
```javascript
<Button type="Accept" text="{i18n>tCreateButton}" press="onPressCreateButton"/>
```
```javascript
onPressCreateButton: function(oEvent) {
  if (!this.oCreateMaterialDialog) {
    this.oCreateMaterialDialog = new Dialog({
      title: "Available Products",
      content: [
        new sap.m.Label({
          text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogLabelMaterialText"),
          labelFor: "MaterialTextCreate"
        }),
        new sap.m.Input("MaterialTextCreate", {
          width: "100%",
          maxLength: 10,
          liveChange: function() {
            this.checkBeginButtonEnabled(oEvent);
          }.bind(this)
        }),
        new sap.m.Label({
          text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogLabelGroupIDText"),
          labelFor: "GroupIdCreate"
        }),
        new sap.m.Input("GroupIdCreate", {
          width: "100%",
          maxLength: 10,
          liveChange: function() {
            this.checkBeginButtonEnabled(oEvent);
          }.bind(this)
        }),
          new sap.m.Label({
          text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogLabelSubGroupIDText"),
          labelFor: "SubGroupIdCreate"
        }),
        new sap.m.Input("SubGroupIdCreate", {
          width: "100%",
          maxLength: 10,
          liveChange: function() {
            this.checkBeginButtonEnabled(oEvent);
          }.bind(this)
        })
      ],
      beginButton: new sap.m.Button({
        enabled: false,
        type: "Emphasized",
        text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogCreateButton"),
        press: function() {
          this._createMaterial();
          this.oCreateMaterialDialog.close();
        }.bind(this)
      }),
      endButton: new sap.m.Button({
        text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogCancelButton"),
        press: function() {
          this.oCreateMaterialDialog.close();
          sap.ui.getCore().byId("MaterialTextCreate").setValue("");
          sap.ui.getCore().byId("GroupIdCreate").setValue("");
          sap.ui.getCore().byId("SubGroupIdCreate").setValue("");
          oEvent.getSource().getParent().getBeginButton().setEnabled(false);
        }.bind(this)
      }).addStyleClass("sapUiSizeCompact")
    });

    // to get access to the controller's model
    this.getView().addDependent(this.oCreateMaterialDialog);
  }
  this.oCreateMaterialDialog.open();
}
```
### 2. Реализовать удаление записи.<br>
###### WorkListView.xml

```xml
<Table alternateRowColors="true" id="table" width="auto" mode="Delete"
  items="{ path: '/zjblessons_base_Materials', sorter: { path: 'CreatedBy', group: true, descending: false } }"
  noDataText="{worklistView>/tableNoDataText}" busyIndicatorDelay="{worklistView>/tableBusyDelay}" growing="true" growingScrollToLoad="true"
  growingThreshold="20" updateFinished="onUpdateFinished" delete="onPressDelete">
```
###### Worklist.controller.js
```javascript
onPressDelete: function(oEvent) {
  var sPath = oEvent.getParameter("listItem").getBindingContext().getPath();
  if (this._isAllowedEdit(oEvent.getParameter("listItem").getBindingContext().getProperty("CreatedBy")) === true)
  {
  MessageToast.show("Allowed to Edit");
  this.getModel().remove(sPath);
  }
  else
  {
    MessageToast.show("not allowed to edit") ;
  }
```
### 3. Реализовать изменение полей MaterialsText, GroupID и SubGroupID записи.<br>
```javascript
onPressEditButton: function(oEvent) {
  if (!this.oEditMaterialDialog) {
    this.oEditMaterialDialog = new Dialog({
      title: "Edit Products",
      content: [
        new sap.m.Label({
          text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogLabelMaterialText"),
          labelFor: "MaterialTextEdit"
        }),
        new sap.m.Input("MaterialTextEdit", {
          width: "100%",
          maxLength: 10,
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
          liveChange: function() {
            this.checkBeginButtonEnabled(oEvent);
          }.bind(this)
        })
      ],
      beginButton: new sap.m.Button({
        enabled: false,
        type: "Emphasized",
        text: this.getView().getModel("i18n").getResourceBundle().getText("EditDialogCreateButton"),
        press: function() {
          this._updateMaterial();
          this.oEditMaterialDialog.close();
        }.bind(this)
      }),
      endButton: new sap.m.Button({
        text: this.getView().getModel("i18n").getResourceBundle().getText("EditDialogCancelButton"),
        press: function() {
          this.oEditMaterialDialog.close();
          sap.ui.getCore().byId("MaterialTextEdit").setValue("");
          sap.ui.getCore().byId("GroupIdEdit").setValue("");
          sap.ui.getCore().byId("SubGroupIdEdit").setValue("");
          oEvent.getSource().getParent().getBeginButton().setEnabled(false);
        }.bind(this)
      }).addStyleClass("sapUiSizeCompact")
    });

    // to get access to the controller's model
    this.getView().addDependent(this.oEditMaterialDialog);
  }
  this.oEditMaterialDialog.setBindingContext(oEvent.getSource().getBindingContext());

  if (this._isAllowedEdit(oEvent.getSource().getParent().getBindingContext().getProperty("CreatedBy")) === true)
  {
  MessageToast.show("Allowed to Edit");
  this.oEditMaterialDialog.open();
  }
  else
  {
    MessageToast.show("not allowed to edit") ;
  }					
}
```
ДЗ*:
### 1. При создании сделать обработку для свойства "Enabled" для кнопки, при нажатии на которую создается запись. То есть если одно из полей не заполнено, то кнопка не активна.
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-4/screenshots/chrome_WbDRy3Oi5i.gif)<br>
```javascript
new sap.m.Input("GroupIdCreate", {
  width: "100%",
  maxLength: 10,
  liveChange: function() {
    this.checkBeginButtonEnabled(oEvent);
}.bind(this)
```
```javascript
checkBeginButtonEnabled: function(oEvent) {
    if (
      this.oCreateMaterialDialog.getContent()[1].getValue().split(" ").join("").length > 0 && this.oCreateMaterialDialog.getContent()[3].getValue().split(" ").join("").length > 0
      && this.oCreateMaterialDialog.getContent()[5].getValue().split(" ").join("").length > 0
    )
      oEvent.getSource().getParent().getBeginButton().setEnabled(true);
    else if (
      this.oEditMaterialDialog.getContent()[1].getValue().split(" ").join("").length > 0 && this.oEditMaterialDialog.getContent()[3].getValue().split(" ").join("").length > 0
        && this.oEditMaterialDialog.getContent()[5].getValue().split(" ").join("").length > 0
    )
      oEvent.getSource().getParent().getBeginButton().setEnabled(true);
    else oEvent.getSource().getParent().getBeginButton().setEnabled(false);
  }
```
### 2. Сделать возможным изменение и удаление только для своего пользователя. Логику проверки вынести в отдельную функцию.
<br>
удаление<br>

![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-4/screenshots/chrome_5VOo9zusE0.gif)
редактирование<br>
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-4/screenshots/chrome_7EACE9O56T.gif)<br>
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-4/screenshots/chrome_y0riDLMW0t.gif)<br>
<br>
```javascript
_isAllowedEdit : function(CreatedIdCheck){
  return CreatedIdCheck  === "D1B1000039" ?   true :  false;
  }
```
```javascript
if (this._isAllowedEdit(oEvent.getSource().getParent().getBindingContext().getProperty("CreatedBy")) === true)
  {
  MessageToast.show("Allowed to Edit");
  this.oEditMaterialDialog.open();
  }
```
```javascript
if (this._isAllowedEdit(oEvent.getParameter("listItem").getBindingContext().getProperty("CreatedBy")) === true)
  {
  MessageToast.show("Allowed to Edit");
  this.getModel().remove(sPath);
  }
  else
  {
    MessageToast.show("not allowed to edit") ;
  }
```
