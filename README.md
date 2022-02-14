# JETBI-home-work
JETBI-home-work-4

ДЗ:
1. Реализовать создание записей в сущности "/zjblessons_base_Materials". Задавать из UI поля MaterialsText, GroupID, SubGroupID, Version="A", Language="RU". Для задания каждого из полей использовать подписанный лейблом( Label) Input .
###### Кнопка
```xml
<Button type="Accept" text="{i18n>tCreateButton}" press="onPressCreateButton"/>
```
###### Функция
```javascript
<Button type="Accept" text="{i18n>tCreateButton}" press="onPressCreateButton"/>
```

3. Реализовать удаление записи.<br>
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
  this.getModel().remove(sPath);
}
```
4. Реализовать изменение полей MaterialsText, GroupID и SubGroupID записи.<br>
ДЗ*:
1. При создании сделать обработку для свойства "Enabled" для кнопки, при нажатии на которую создается запись. То есть если одно из полей не заполнено, то кнопка не активна.
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
  if (sap.ui.getCore().byId("MaterialTextCreate").getValue().split(" ").join("").length > 0 && sap.ui.getCore().byId("GroupIdCreate")
    .getValue().split(" ").join("").length > 0) {
    oEvent.getSource().getParent().getBeginButton().setEnabled(true);
  } else {
    oEvent.getSource().getParent().getBeginButton().setEnabled(false);
  }
}
```
3. Сделать возможным изменение и удаление только для своего пользователя. Логику проверки вынести в отдельную функцию.

Срок до 14.02.2022
ДЗ по этой лекции присылать на почту: pavel.gorelyshev@jetbi.com
