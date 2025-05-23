# Скринер Облигаций на базе ISS MOEX
- Открыть приложение можно по ссылке https://beachbanny.github.io/MOEX-Bonds/
- Как использовать приложение 
<a href="http://www.youtube.com/watch?feature=player_embedded&v=N3R0Q7D2kFA" target="_blank">
 <img src="http://img.youtube.com/vi/N3R0Q7D2kFA/mqdefault.jpg" alt="Watch the video" width="240" height="180" border="10" />
</a>

# Что можно делать в приложении
## Вкладка "Search" 
- поиск облигаций по заданным параметрам, первый раз поиск может работать несколько минут, при повторных вызовах работает намного быстрее, так как данные кешируются в браузере
- найденные облигации можно сортировать, нажимая на стрелки в названии колонок, также некоторые колонки можно скрыть из просмотра
- также по двойному клику на строке с облигацией, ее можно отметить, добавиться значок "#" и облигация добавиться в список "Checked"
- здесь же можно Сохранить найденый список облигаций в CSV format, которые потом можно открыть и использовать в Excell; Сохранить или Загрузить(предварительно сохраненный) список эммитентов; Сохранить или Загрузить(предварительно сохраненный) портфель купленных облигаций; Сохранить список отобранных облигаций - сохраняется в JSON формате.

## Вкладка "Checked"
- работа со списком отобранных облигаций - в для того чтобы каждый раз не искать одно и тоже, и также тут можно добавить комментарий к облигации, например когда ее купить или продать

## Вкладка "Emitents"
- работа со списком эмитентов, список формируется автоматически на основании данных облигаций которые вы искали
- используется для того чтобы заполнито Кредитный рейтинг эммитента, на основании имеющихся у вас данных поле "KR" например пишем тут "AA | A+" если по одним данным у эмитента рейтинг "АА" и по другим "A+"
- также в поле "Rating" можно добавить краткую дополнительной информацию по рейтингу
- в поле URL используется для ввода ссылок на информацию о рейтинге эмитента, чтобы не искать эту информацию каждый раз, можно ввести несколько ссылок, они должны быть разделены точкой с запятой ";"

## Вкладки "Broker1" "Broker2" "Broker3" "Broker4"
- используются для ведения портфеля имеющихся у вас облигаций, для ввода информации о купленной облигации, надо в поле "Инструмент" ввести начало наименования с соблюдением регистра, пример "Пион" и нажать на кнопку [ => ] для поиска облигаций, после этого в брайзере Firefox нажать стрелку вниз, в Chrome(и подобных) нажать стрелку вниз или мышкой на появившюся иконку треугольника в поле "Инструмент" и выбрать нужную облигацию из списка; кроме этого нужно ввести количество купленных облигаций в поле "Count"; цену покупки(или среднюю) в процентах; доходность в % при покупке(или среднюю).
- при докупке облигаций редактируйте существуущюю запись вместо ввода новой!
- колонка "SUM" - стоимость облигаций считается автоматически на основе текущей стоимости облигации на бирже
- колонки "ТекЦена%" "ТекСтавка%" - заполняются на основе текущх данных с биржи

## Вкладка "Emitents%"
- сводная таблица распределения купленных облигаций по брокерам и эммитентам, на основе заполненных портфелей, колонка "Proc%" - показывает на какой процент от всех затраченных денег куплено облигаций данного эмитента
- если заполните кредитный рейтинг на вкладке "Emitents" - то у каждого эмитенты тут будет показаваться также и его кредитный рейтинг
 
