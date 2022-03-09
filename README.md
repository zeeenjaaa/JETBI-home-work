# JETBI-home-work

Скачать [Проект архивом](https://github.com/zeeenjaaa/JETBI-home-work/raw/MasterDetail-2/md2.zip)

Иллюстрация работы проекта.

# ДЗ по пунктам:
### 1. Вывести кнопки в тулбар как на скрине
см. ниже.
### 2.Сделать функционал для кнопок (Просмотр акти/дективированных записей, возможность деактивировать записи , возможность активировать записи, удалить окончательно, функционал для кнопки изменения одиночного или мультиселекта записей)
#### Удаление записи
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-2/screenshots/chrome_aGdCIX8Wou.gif)
```javascript
onPressDelete: function(oEvent) {
  var that = this;
  var aSelectedContext = this._oTable.getSelectedIndices().map(function(iSelectedIndex) {
    return this._oTable.getContextByIndex(iSelectedIndex);
  }.bind(this));
  if (this.getModel("detailView").getProperty("/button/pressed/ChangeVersionMode")) {
    MessageBox.confirm(this.getModel("i18n").getResourceBundle().getText("msgConfirmDelete"), {
      onClose: function(oAction) {
        if (oAction === MessageBox.Action.OK) {
          aSelectedContext.forEach(function(oContext) {
            that.getModel().remove(oContext.getPath(), {
              success: function() {
                MessageToast.show(that.getModel("i18n").getResourceBundle().getText("msgSuccessDelete"));
              }
            });
          });
        }
      }
    });
  } 

  ....
},
```

#### Обновление таблицы
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-2/screenshots/chrome_C82DmS5CnY.gif)
```javascript
onPressRefresh: function(oEvent) {
    this._oSmartTable.rebindTable(true);
    MessageToast.show(this.getModel("i18n").getResourceBundle().getText("msgRefreshTable"));
  },
```
#### Восстановление записи
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-2/screenshots/chrome_Q4m4I011Oy.gif)
```javascript
onPressRestore: function(oEvent) {
  var that = this;
  var aSelectedContext = this._oTable.getSelectedIndices().map(function(iSelectedIndex) {
    return this._oTable.getContextByIndex(iSelectedIndex);
  }.bind(this));

  if (this.getModel("detailView").getProperty("/button/pressed/ChangeVersionMode")) {
    MessageBox.confirm(this.getModel("i18n").getResourceBundle().getText("msgConfirmRestore"), {
      onClose: function(oAction) {
        if (oAction === MessageBox.Action.OK) {
          aSelectedContext.forEach(function(oContext) {
            that.getModel().setProperty(oContext.getPath() + "/Version", "A");
          });
          that.getModel().submitChanges({
            success: function() {
              MessageToast.show(that.getModel("i18n").getResourceBundle().getText("msgSuccessRestore"));
            }
          });
        }
      }
    });
  }
},
```
#### Деактивация записи
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-2/screenshots/chrome_7OZZRR7oZy.gif)
```javascript
onPressDelete: function(oEvent) {
    ...
    else {
      MessageBox.confirm(this.getModel("i18n").getResourceBundle().getText("msgConfirmDeactivate"), {
        onClose: function(oAction) {
          if (oAction === MessageBox.Action.OK) {
            aSelectedContext.forEach(function(oContext) {
              that.getModel().setProperty(oContext.getPath() + "/Version", "D");
            });
            that.getModel().submitChanges({
              success: function() {
                MessageToast.show(that.getModel("i18n").getResourceBundle().getText("msgSuccessDeactivate"));
              }
            });
          }
        }
      });
    }
  },
```
#### Просмотр акт/деактивированных записей
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-2/screenshots/chrome_hTNhWpMisM.gif)
```javascript
onPressDeactivateMode: function(oEvent) {
			this._oSmartTable.rebindTable();
			oEvent.getParameter("pressed") ? MessageToast.show(this.getModel("i18n").getResourceBundle().getText("tToastDeactivatedGoods")) :
				MessageToast.show(this.getModel("i18n").getResourceBundle().getText("tToastActivatedGoods"));
		},
```

### * 1. Возможность управления сразу несколькими записями (удаление ,активация и деактивация)
#### Мультиселект
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-2/screenshots/chrome_oqXG2QKYwS.gif)
```javascript
	onPressChangeSelectionMode: function(oEvent) {
			this.getModel("detailView").setProperty("/table/selectionMode", oEvent.getParameter("pressed") ? "Multi" : "Single");
			oEvent.getParameter("pressed") ? MessageToast.show(this.getModel("i18n").getResourceBundle().getText("tToastMultiSelectON")) :
				MessageToast.show(this.getModel("i18n").getResourceBundle().getText("tToastMultiSelectOFF"));
		},
```
### *2 . Выводить фрагмент на кнопку добавить (плюсик)
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-2/screenshots/chrome_KTeq4rwoIr.gif)
```javascript
onPressAdd: function(oEvent) {
			this.onOpenDialog();
			MessageToast.show(this.getModel("i18n").getResourceBundle().getText("tDialogCreate"));
		},
```
```javascript
onOpenDialog: function() {
			this._getAddEditDialog().open();
		},
```
```javascript
_getAddEditDialog: function() {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("md2.md2.view.fragments.AddEditDialog", this);

				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},
```
```xml
<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core">
	<Dialog title="{i18n>tDialogAddTitle}">
		<beginButton >
			<Button text="OK"></Button>
		</beginButton>
		<endButton>
			<Button text="Cancel" press="onPressCancelDialog"></Button>
		</endButton>
		<content>
			<Input></Input>
		</content>
	</Dialog>
</core:FragmentDefinition>
```
