# JETBI-home-work
JETBI-home-work-3
https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-3/screenshots/Screenshot_1.png
ДЗ:
1. Создать приложение Worklist у себя в Web IDE
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-3/screenshots/Screenshot_2.png)<br>
2. Вывести отображение полей в таблице CreatedByFullName, CreatedBy, ModifiedBy, ModifiedBy GroupID, SubGroupID, MaterialText, Created <br>
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-3/screenshots/Screenshot_1.png)<br>
```xml
<columns>
  <Column id="nameColumn">
    <Text text="{i18n>tableNameColumnTitle}" id="nameColumnTitle"/>
  </Column>
  <Column>
    <Text text="{i18n>MaterialDescriptionColumnLabel}"/>
  </Column>
  <Column>
    <Text text="{i18n>CreatedByFullNameColumnLabel}"/>
  </Column>
  <Column>
    <Text text="{i18n>CreatedByColumnLabel}"/>
  </Column>
  <Column>
    <Text text="{i18n>ModifiedByColumnLabel}"/>
  </Column>
  <Column>
    <Text text="{i18n>SubGroupIDColumnLabel}"/>
  </Column>
  <Column>
    <Text text="{i18n>MaterialTextColumnLabel}"/>
  </Column>
  <Column>
    <Text text="{i18n>CreatedColumnLabel}"/>
  </Column>
</columns>
<items>
  <ColumnListItem type="Navigation" press="onPress" highlight="{= ${CreatedBy} === 'D1B1000039' ? 'Success' : 'None' }">
    <cells>
      <ObjectIdentifier title="{MaterialText}"/>
      <Text text="{MaterialDescription}"/>
      <Text text="{CreatedByFullName}"/>
      <Text text="{CreatedBy}"/>
      <Text text="{ModifiedBy}"/>
      <Text text="{SubGroupID}"/>
      <Text text="{MaterialText}"/>
      <Text text="{ path: 'Created' , type: 'sap.ui.model.type.Date', formatOptions: {pattern: 'HH:mm dd/MM/yyyy'} }"/>
    </cells>
  </ColumnListItem>
</items>
```
3. Сделать сортировку записей по CreatedBy по  возрастанию <br>
   Сгруппировать записи по CreatedBy<br>
   Сделать чтобы сначала подгружалось 20 записей, прокручиваем скролл вниз -  прогружается еще пачка записей<br>
```xml
<Table alternateRowColors="true" id="table" width="auto"
				items="{ path: '/zjblessons_base_Materials', sorter: { path: 'CreatedBy', group: true, descending: false } }"
				noDataText="{worklistView>/tableNoDataText}" busyIndicatorDelay="{worklistView>/tableBusyDelay}" growing="true" growingScrollToLoad="true"
				growingThreshold="20" updateFinished="onUpdateFinished">
```

4. Все тексты тянуть из i18n
```tToastButton= Сделай тост
tToastMessage= Привет Мир!
MaterialDescriptionColumnLabel=Описание товара
CreatedByFullNameColumnLabel=Создал ФИО
CreatedByColumnLabel=Создал ID
ModifiedByColumnLabel=Изменил
SubGroupIDColumnLabel=Подгруппа ID
MaterialTextColumnLabel=Товар
CreatedColumnLabel=Создано дата
tableNameColumnTitle=Товар
```
```xml
<Column id="nameColumn">
    <Text text="{i18n>tableNameColumnTitle}" id="nameColumnTitle"/>
  </Column>
  <Column>
    <Text text="{i18n>MaterialDescriptionColumnLabel}"/>
  </Column>
  <Column>
    <Text text="{i18n>CreatedByFullNameColumnLabel}"/>
  </Column>
  <Column>
    <Text text="{i18n>CreatedByColumnLabel}"/>
  </Column>
  <Column>
    <Text text="{i18n>ModifiedByColumnLabel}"/>
  </Column>
  <Column>
    <Text text="{i18n>SubGroupIDColumnLabel}"/>
  </Column>
  <Column>
    <Text text="{i18n>MaterialTextColumnLabel}"/>
  </Column>
  <Column>
    <Text text="{i18n>CreatedColumnLabel}"/>
  </Column>
```
6. Сделать кнопку, по нажатию на которую будет отображаться MessageToast с текстом "Say Hello"
```xml
	<Button type="Accept" text="{i18n>tToastButton}" press="onPressToastMessage" icon="sap-icon://activate"/>
```
```javascript
  onPressToastMessage: function(oEvent) {
        var msg = this.getView().getModel("i18n").getResourceBundle().getText("tToastMessage");
        MessageToast.show(msg);
      }
```

ДЗ*:
1. Сделать форматирование поля Created по шаблону HH:mm dd/MM/yyyy. 
```xml
	<Text text="{ path: 'Created' , type: 'sap.ui.model.type.Date', formatOptions: {pattern: 'HH:mm dd/MM/yyyy'} }"/>
```
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-3/screenshots/Screenshot_5.png)<br>
3.  Сделать, чтобы записи где CreatedBy = Ваш пользователь подсвечивалась слева зеленым цветом.
```xml
	<ColumnListItem type="Navigation" press="onPress" highlight="{= ${CreatedBy} === 'D1B1000039' ? 'Success' : 'None' }">
```
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-3/screenshots/Screenshot_4.png)<br>
5. Сделать чтобы в MessageToast подтягивались текста из i18n, и на русском было "Привет мир!"
```javascript
  onPressToastMessage: function(oEvent) {
        var msg = this.getView().getModel("i18n").getResourceBundle().getText("tToastMessage");
        MessageToast.show(msg);
      }
```
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-3/screenshots/Screenshot_3.png)<br>
ДЗ+:
1. Сделать приложение на всю ширину экрана.
```html
new Shell({
  appWidthLimited:false,
```
![This is an image](https://github.com/zeeenjaaa/JETBI-home-work/blob/Worklist-3/screenshots/Screenshot_1.png)<br>
