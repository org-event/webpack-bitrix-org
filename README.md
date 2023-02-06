# webpack-bitrix-org

Это собственная конфигурация Webpack для разработки шаблонов под Битрикс.
Она работает в 2 режимах: 
- "dev" - для разработки frontend, с созданием страниц и подключением в них компонентов;
- "build" - для сборки компонентов в полноценные шаблоны под архитектуру Битрикс.

## Инструкция

Разработку необходимо вести в директории "src". В ней расположены директории "pages" и "modules".
В "pages" будут размещаться страницы, необходимые для разработки в режиме "dev".
В "modules" будут размещаться модули, которые в режиме "dev" будут подключаться к страницам, а в режиме "build" будут
служить для сборки независимых шаблонов компонентов.
Подключение модулей на страницы осуществляется тегом <include-название_модуля />.
В директории "assets" необходимо разместить статический контент (изображения, шрифты, другие статические файлы). 

---

Сборка состоит из двух демо-модулей и двух демо-страниц. Для начала работы необходимо загрузить все исходные файлы
в заранее созданную директорию "frontend", иметь установленный node.js (желательно, самой свежей стабильной версии).

---

Для инициализации необходимо выполнить:

`npm install`

Для сборки в режиме dev:

`npm run dev`

Для сборки в режиме build:

`npm run build`

Для удобной разработки рекомендуется использовать локальный сервер. Для старта необходимо выполнить:

`npm run serve`

---

В последующих обновлениях рассчитываю подробно описать процесс размещения "frontend" относительно 
файловой архитектуры Битрикс, а также настроить линтеры "scss" и "js".

---

Всем успехов в разработке!


