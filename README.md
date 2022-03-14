# JETBI-home-work

Скачать [Проект архивом](https://github.com/zeeenjaaa/JETBI-home-work/raw/MasterDetail-3/md2.zip)

Иллюстрация работы проекта.

# ДЗ по пунктам:
## 1. Выводить фрагменты при создании и изменении записи для всех сущностей
смотри ниже.
## 2. Сделать p13n колонку для сущности SubGroups
смотри ниже.

## *1. Выводить один и тот же фрагмент для всех сущностей 
## *2. Выводить колонку p13n для всех сущностей, Вставить input  вместо текста; !Приложение должно поддерживать русскоязычную и англоязычную локализацию(все тексты на двух языках)!

### Сразу гифки с фрагментом. Потом скрины с p13n. Потом вырезки кода.


![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-3/screenshots/chrome_UJvb7GVm4u.gif)
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-3/screenshots/chrome_3Gcns8rT45.gif)
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-3/screenshots/chrome_IbnOGMpnzR.gif)
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-3/screenshots/chrome_CpgUgTrktu.gif)
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-3/screenshots/chrome_895ydIyXG7.gif)

![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-3/screenshots/chrome_Oe328Yv1CK.gif)
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-3/screenshots/chrome_2E6ZpoETTb.gif)
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-3/screenshots/chrome_GRn9UaPFIO.png)
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-3/screenshots/chrome_Oofq9KVX9S.png)
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-3/screenshots/chrome_k0rExUh5NY.png)
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/MasterDetail-3/screenshots/chrome_qGj9b5LVit.png)

Фрагмент
```xml
<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:smartForm="sap.ui.comp.smartform"
	xmlns:smartField="sap.ui.comp.smartfield">
	<Dialog title="{= ${detailView>/dialog/mode} === 'addMode' ? ${i18n>tDialogAddTitle} : ${i18n>tDialogUpdateItem} }">
		<buttons>
			<Button visible="{= ${detailView>/dialog/mode} === 'addMode'}" text="{i18n>tDialogButtonOk}" press="onPressOKCreate"/>
			<Button visible="{= ${detailView>/dialog/mode} === 'editMode'}" text="{i18n>tDialogButtonOk}" press="onPressOKUpdate"/>
			<Button text="{i18n>tDialogButtonCancel}" press="onPressCancelDialog"/>
		</buttons>
		<content>
			<Input id="addInput" value="{GroupText}" visible="{= ${detailView>/dialog/mode} === 'addMode'}"
				description="{i18n>tEnter} {detailView>/dialog/nameField}" placeholder="{i18n>tEnter} {detailView>/dialog/nameField}"/>
			<Input id="changeInput"
				value="{= ${detailView>/entity/name} === 'GroupText' ? ${GroupText} :
				${detailView>/entity/name} === 'SubGroupText' ? ${SubGroupText} :
				${detailView>/entity/name} === 'PlantText' ? ${PlantText} :
				${detailView>/entity/name} === 'RegionText' ? ${RegionText} : ''}"
				visible="{= ${detailView>/dialog/mode} === 'editMode'}" description="{i18n>tChange} {detailView>/dialog/nameField}"/>
		</content>
	</Dialog>
</core:FragmentDefinition>
```
вызов фрагмента
```javascript
	onUpdatePress: function(oEvent) {
			var oContext = oEvent.getSource().getBindingContext();
			this.getModel("detailView").setProperty("/dialog/mode", "editMode");
			this.getModel("detailView").setProperty("/dialog/title", "Edit item");

			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("md2.md2.view.fragments.AddEditDialog", this);
				this.getView().addDependent(this._oDialog);
				this._oDialog.setBindingContext(oContext);

				this._oDialog.open();
			}
			MessageToast.show(this.getModel("i18n").getResourceBundle().getText("tDialogUpdateItem"));

		},
		onPressAdd: function(oEvent) {
			var oContext = oEvent.getSource().getBindingContext();
			this.getModel("detailView").setProperty("/dialog/mode", "addMode");

			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("md2.md2.view.fragments.AddEditDialog", this);

				this.getView().addDependent(this._oDialog);
				this._oDialog.setBindingContext(oContext);

				this._oDialog.open();
			}
			MessageToast.show(this.getModel("i18n").getResourceBundle().getText("tDialogCreate"));
		},
```
### Редактирование записи
```javascript
	onPressOKUpdate: function(oEvent) {
			var sEntity = this.getModel("detailView").getProperty("/entity/name");
			var sPath = this._oDialog.getBindingContext().getPath();
			if (sEntity === "GroupText") {
					this.getModel().update(sPath, {
				GroupText: this._oDialog.getContent()[1].getValue()
			}, {
				success: function(e) {
					MessageToast.show("Edited OK");
				},
				error: function(e) {
					MessageToast.show("Editing Error");
				}
			});
			}
			if (sEntity === "SubGroupText") {
					this.getModel().update(sPath, {
				SubGroupText: this._oDialog.getContent()[1].getValue()
			}, {
				success: function(e) {
					MessageToast.show("Edited OK");
				},
				error: function(e) {
					MessageToast.show("Editing Error");
				}
			});
			}
			if (sEntity === "PlantText") {
					this.getModel().update(sPath, {
				PlantText: this._oDialog.getContent()[1].getValue()
			}, {
				success: function(e) {
					MessageToast.show("Edited OK");
				},
				error: function(e) {
					MessageToast.show("Editing Error");
				}
			});
			}
			if (sEntity === "RegionText") {
					this.getModel().update(sPath, {
				RegionText: this._oDialog.getContent()[1].getValue()
			}, {
				success: function(e) {
					MessageToast.show("Edited OK");
				},
				error: function(e) {
					MessageToast.show("Editing Error");
				}
			});
			}
			this._oDialog.destroy();
			this._oDialog = null;

		},
```
### Создание записи
```javascript
	onPressOKCreate: function(oEvent) {
			var oContext;
			var sEntity = this.getModel("detailView").getProperty("/entity/name");
			if (sEntity === "GroupText") {
				oContext = this.getModel().createEntry(this._oSmartTable.getEntitySet(), {
					properties: {
						GroupText: this._oDialog.getContent()[0].getValue(),
						GroupID: "",
						Version: "A",
						Language: "RU"
					}
				});
				this._oDialog.setBindingContext(oContext);
			}
			if (sEntity === "SubGroupText") {
				oContext = this.getModel().createEntry(this._oSmartTable.getEntitySet(), {
					properties: {
						SubGroupText: this._oDialog.getContent()[0].getValue(),
						SubGroupID: "",
						Version: "A",
						Language: "RU"
					}
				});
				this._oDialog.setBindingContext(oContext);

			}
			if (sEntity === "PlantText") {

				oContext = this.getModel().createEntry(this._oSmartTable.getEntitySet(), {
					properties: {
						PlantText: this._oDialog.getContent()[0].getValue(),
						PlantID: "",
						Version: "A",
						Language: "RU"
					}
				});
				this._oDialog.setBindingContext(oContext);

			}
			if (sEntity === "RegionText") {

				oContext = this.getModel().createEntry(this._oSmartTable.getEntitySet(), {
					properties: {
						RegionText: this._oDialog.getContent()[0].getValue(),
						RegionID: "",
						Version: "A",
						Language: "RU"
					}
				});
				this._oDialog.setBindingContext(oContext);

			}

			this.getModel().submitChanges({
				success: function() {
					MessageToast.show(this.getModel("i18n").getResourceBundle().getText("msgAddGood"));
				}.bind(this)
			});
			this._oDialog.destroy();
			this._oDialog = null;
		},
```
### Колоночка p13n
```javascript
		this._oTable.addColumn(
				new sap.ui.table.Column({
					template: new sap.m.Input({
						value: "{"+this.getModel("detailView").getProperty("/entity/name").slice(0,-4)+"ID"+"}"
					}),
					label: new sap.m.Label({
						text: this.getModel("detailView").getProperty("/entity/name").slice(0,-4)+"ID"
					}),
					customData: [
						new sap.ui.core.CustomData({
							key: "p13nData",
							value: {
								"columnKey": this.getModel("detailView").getProperty("/entity/name").slice(0,-4)+"ID",
								"leadingProperty": this.getModel("detailView").getProperty("/entity/name").slice(0,-4)+"ID",
								columnIndex: "3"
							}
						})
						]
				})
				);
```
