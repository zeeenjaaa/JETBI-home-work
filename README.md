# JETBI-home-work-8
# ДЗ(выполняем, изменяя свои приложения, разработанные в рамках предыдущих ДЗ):
### 1. Изучить материал по ссылкам, которые я оставил для вас в презентации. Все текста, иконки тянем из i18n.
### 2. Добавить IconTabBar и 2 IconTabFilter в нём. В одном разместить результат предыдущих разработок(list), 2 вкладка Forms.
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-8/screenshots/chrome_aSq8A39BBx.png)
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-8/screenshots/chrome_EqkKZugIJP.png)
### 3. Во 2-ой IconTabFilter добавить SmartForm с 5-ю группами(main ,Regions, Plants, creation(Created, CreatedByFullName), modification(Modified, ModifiedByFullName). В формах выводим  В тулбар добавить кнопку обновления, подключить реализованный ранее обработчик для неё.
<br>смотри выше
### 4. В группу Main information  добавить MaterialText, MaterialDescription
<br>смотри выше
### 5. В группу Region добавить Smartfield для RegionText и RegionID. RegionText - выпадающий список, RegionText - невидимое поле для пользователя. При выборе значения из списка RegionText , RegionIDдолжен заполняться. После выбора значения отображать на экране MessageToast с выбранным значением.
<br>

невидимость поля

```xml
<smartField:SmartField value="{RegionID}" visible="false"/>
```

![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-8/screenshots/chrome_xGZ9Qy0IUQ.gif)<br>

```javascript
onRegionChanged: function(oEvent) {
  MessageToast.show("Chosen " + oEvent.getParameters().value);
}
```
### 6. В группу subgroup добавить Smartfield для PlantText и PlantID. PlantText - value help не в виде выпадающего списка, а виде окошка, PlantID - невидимое поле для пользователя. При выборе значения из списка PlantText, PlantID должен заполняться. Значения в PlantText должны ограничиваться по RegionID.

![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-8/screenshots/chrome_vvTruZ9dV9.png)
### 7. В группы creation, modification info отобразить соответственно (Created, CreatedByFullName и Modified, ModifiedByFullName). Реализовать выбор и отображение дат без времени
```xml
<smartForm:Group label="{i18n>tFormModificationLabel}">
    <smartForm:GroupElement>
      <smartField:SmartField value="{path: 'Modified', type:'sap.ui.model.type.DateTime', formatOptions: { pattern: 'yyyy/MM/dd' }}"
        editable="false"/>
    </smartForm:GroupElement>
    <smartForm:GroupElement>
      <smartField:SmartField value="{ModifiedByFullName}" editable="false"/>
    </smartForm:GroupElement>
  </smartForm:Group>

<smartForm:Group label="{i18n>tFormCreationLabel}">
    <smartForm:GroupElement>
      <smartField:SmartField value="{path: 'Created', type:'sap.ui.model.type.DateTime', formatOptions: { pattern: 'yyyy/MM/dd' }}"
        editable="false"/>
    </smartForm:GroupElement>
    <smartForm:GroupElement>
      <smartField:SmartField value="{CreatedByFullName}" editable="false"/>
    </smartForm:GroupElement>
  </smartForm:Group>
```
### 8. Добавить кнопку назад, при нажатии на которую происходит переход в worklist. Также при включении эдитМода дизейблить кнопку.
```xml
<Button type="Back" press="onNavBack" enabled="{= !${objectView>/editMode}}"/>
```
```javascript
onNavBack: function() {
  var sPreviousHash = History.getInstance().getPreviousHash();
  if (sPreviousHash !== undefined) {
    history.go(-1);
  } else {
    this.getRouter().navTo("worklist", {}, true);
  }
},
```

![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-8/screenshots/chrome_jDefShaQAq.gif)
### На вкладке Form переход в редактирование происходит по нажатию на "карандашик". Сохранение записи можно делать как при нажатии на save, так и при нажатии на "очки"

# Дополнительные задания: <br>
### 9*. Добавить подтверждение перед переходом в режим просмотра из режима редактирования в виде MessageBox с текстом запроса у пользователя действия(сохранить/отменить). В зависимости от выбранного пользователем действия выполнить ту или иную операцию с данными. 
```javascript
onEditToggled: function(oEvent) {
    if (oEvent.getParameter("editable") === false) {
      this.confirmMessageBoxPress(oEvent);
      this.getView().getModel("objectView").setProperty("/editMode", false);
    } else {
      this.getView().getModel("objectView").setProperty("/editMode", true);
    }
....
}
```
```javascript
confirmMessageBoxPress: function(oEvent) {
    MessageBox.warning(this.getView().getModel("i18n").getResourceBundle().getText("tMessageBoxConfirm"), {
      actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
      emphasizedAction: MessageBox.Action.OK,
      onClose: function(sAction) {
        MessageToast.show("Action selected: " + sAction);
        if (sAction === "OK") {
          this.onPressSave();
        }
        if (sAction === "CANCEL") {
          this.onRefresh();
        }
      }.bind(this)
    });
  },
```

![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-8/screenshots/chrome_dClH0ciIVt.gif)
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-8/screenshots/chrome_Gpea1rTjD0.gif)
### 10*. При включении режима редактирования дизеблить переход по табам: к примеру, если мы находимся на вкладке Form и включаем режим редактирования, то мы не можем перейти на вкладку List, для List нельзя перейти на Form при режиме редактирования для листа.
```javascript
	onEditToggled: function(oEvent) {
  .....
  if (this.getView().getModel("objectView").getProperty("/editMode") === true) {
      if (this.getView().byId("idIconTabBarNoIcons").getProperty("selectedKey") === "List") {
        this.getView().byId("form").setProperty("enabled", false);
      }
      if (this.getView().byId("idIconTabBarNoIcons").getProperty("selectedKey") === "Form") {
        this.getView().byId("list").setProperty("enabled", false);
      }
    } else {
      this.getView().byId("form").setProperty("enabled", true);
      this.getView().byId("list").setProperty("enabled", true);
    }
}
```
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-8/screenshots/chrome_UPwEVfhnRU.gif)
### 11*. Для MaterialText, добавить на форму, добавить выбор значений из выпадающего списка. Сделать доступным как выбор значения из списка, так и ввод значения с клавиатуры в поле.
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-8/screenshots/chrome_29lue85TBN.gif)
### 12** Для RegionText на вкладке List добавить написать фильтр, результатом которого будет, чтобы в фильтре PlantText выводились только Plants для этого Региона.
