# ДЗ(выполняем, изменяя свои приложения, разработанные в рамках предыдущих ДЗ):
## 1. Изучить материал по ссылкам, которые я оставил для вас в презентации
## 2. Реализовать включение/выключение режима редактирования с помощью JSON model binding (без вызова обработчика события нажатия на кнопку) - контрол switch
```xml
<Switch type="Default" state="{objectView>/editMode}"/>
```
```javascript
onInit: function() {
  var iOriginalBusyDelay,
    oViewModel = new JSONModel({
      ...
      editMode: false,
      ...
    });
    ...
}
```
## 3. На object вывести элементы, используя List>InputListItem>Text/Input/Select. В зависимости View/Edit мод отображать или текста, или инпуты и селекты(поимер на скриншотах). Добавить кнопки save, cancel. По нажатию на save происходит переход во view мод и сохранение изменений, при нажатии на cancel откатываются несохраненные изменения без!! перехода во view мод.
```xml
<List headerText="{i18n>MaterialTextColumnLabel}: {MaterialText}">
  <InputListItem label="{= ${objectView>/editMode} ? ${i18n>tSwitchTextTrue} :${i18n>tSwitchTextFalse}}">
    <Switch type="Default" state="{objectView>/editMode}"/>
  </InputListItem>
  <InputListItem label="{i18n>MaterialTextColumnLabel}">
    <Text id="idMaterialText" text="{json>/MaterialText}" visible="{= !${objectView>/editMode}}"/>
    <Input id="idMaterialTextin" value="{json>/MaterialText}" visible="{objectView>/editMode}" width="100%" maxLength="20"
      valueLiveUpdate="true"/>
  </InputListItem>
  <InputListItem label="{i18n>GroupIDColumnLabel}">
    <Text id="idGroupIDText" text="{json>/GroupID}" visible="{= !${objectView>/editMode}}"/>
    <Input id="idGroupIDTextin" value="{json>/GroupID}" visible="{objectView>/editMode}" width="100%" maxLength="20"
      valueLiveUpdate="true"/>
  </InputListItem>
  <InputListItem label="{i18n>SubGroupIDColumnLabel}">
    <Text id="idSubGroupIDText" text="{json>/SubGroupID}" visible="{= !${objectView>/editMode}}"/>
    <Input id="idSubGroupIDTextin" value="{json>/SubGroupID}" visible="{objectView>/editMode}" width="100%" maxLength="20"
      valueLiveUpdate="true"/>
  </InputListItem>
    <InputListItem label="{i18n>RegionText}">
    <Select selectedKey="{RegionID}" items="{path: '/zjblessons_base_Regions', sorter: {path: 'RegionID', descending: false}}" visible="{objectView>/editMode}">
      <core:Item key="{RegionID}" text="{RegionText}"/>
    </Select>
    <Text id="idRegion" text="{json>/RegionText}" visible="{= !${objectView>/editMode}}"/>
  </InputListItem>
  <InputListItem label="{i18n>MODIFIED}">
    <Text id="idModified" text="{parts: ['Modified', 'ModifiedByFullName'], formatter: '.formatter.modifiedInfo'}" visible="true"/>
  </InputListItem>
  <InputListItem label="{i18n>CreatedColumnLabel}">
    <Text id="idCreated" text="{path: 'Created', type:'sap.ui.model.type.DateTime', formatOptions: {style: 'short'}}" visible="true"/>
  </InputListItem>
</List>
```
## 4. Добавить в заголовок элемент, который будет менять свое значение в зависимости от View/Edit Мода. Пример заголовка: Detail page, mode: View. 
```xml
<Title class="sapUiMediumMarginBeginEnd" text="{i18n>tDetailPageTitleMode} {= ${objectView>/editMode}?${i18n>tSwitchTextTrue}:${i18n>tSwitchTextFalse}}"/>
```
## 5. Реализовать вывод информации о создании в формате, установленном в зависимости от настроек даты и времени на пк(использовать format options)
```xml
<Text id="idCreated" text="{path: 'Created', type:'sap.ui.model.type.DateTime', formatOptions: {style: 'short'}}" visible="true"/>
```
## 6. Реализовать вывод информации о изменение в формате: Modified by Evgeniy Sirosh on 2022.02.14 21:29
смотри ниже - пункт 9.

## 7. Сделать все тексты языкозависимыми (добавить тексты в i18n и использовать их во view, с помощью биндинга i18n модели)

# Дополнительные задания:
## 8*. Реализовать в п.3 языкозависимый вывод информации о режиме(англ. view/edit, рус. просмотр/редактирование)
```xml
<Title class="sapUiMediumMarginBeginEnd"
text="{i18n>tDetailPageTitleMode} {= ${objectView>/editMode}?${i18n>tSwitchTextTrue}:${i18n>tSwitchTextFalse}}"/>
```
и дублирую в самой таблице
```xml
<InputListItem label="{= ${objectView>/editMode} ? ${i18n>tSwitchTextTrue} :${i18n>tSwitchTextFalse}}">
```
## 9**. Для п.4 выводить только фамилию, без имени, изменить формат даты, и выводить помимо даты добавления/изменения сколько дней назад запись была добавлена/изменена, все вводимые руками текста должны быть языкозависимыми. Окончательны вариант: Modified by Sirosh on Thu, Feb 14, 2022, modified 5d, 20h, 15m ago.
```xml
<InputListItem label="{i18n>MODIFIED}">
  <Text id="idModified" text="{parts: ['Modified', 'ModifiedByFullName'], formatter: '.formatter.modifiedInfo'}" visible="true"/>
</InputListItem>
```
```javascript
modifiedInfo : function (Modified, ModifiedByFullName){
    //time format pattern
    var oDateFormat= dateFormat.getDateTimeInstance({
      pattern: "dd/MM/yyyy HH:mm"
    });
    //apply pattern
    var niceData = oDateFormat.format(Modified);
    //calculate time interval from now to modfied time in hours
    var currentData = new Date();
    var HoursFromNow = Math.round((new Date()-Modified)/3600000);
    //picking last name from full name
     if (ModifiedByFullName != null){
      var justLastName = ModifiedByFullName;
      justLastName= ModifiedByFullName.split(' ')[1];
     }
    //forming an answer
     var answer = this.getModel("i18n").getResourceBundle().getText("Modified").concat(" " +niceData+"  "+ justLastName +" "+ HoursFromNow +" "+this.getModel("i18n").getResourceBundle().getText("tHoursAgo"));
    return answer;
  }
```

## 10***(необязательно)  При удалении записи на странице worklist сделать таким образом, чтобы бизи индикатор отображался только на удаляемой записи. Перед выполнением этого задания написать @evgeniysirosh или в чат, нужно сделать специфические настройки manifest.
По идее нужно прокидывать 'true' в метод setBusy() контрола ColumnListItem. Но у меня не получилось. 
