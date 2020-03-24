## 1. Git
![Git](https://png.icons8.com/color/96/000000/git.png)

### 1.1 Репозиторий
Клонировать через HTTPS:

`git clone https://bitbucket.org/rooxteam/cra-template-rooxteam.git`

Или клонировать через SSH:

`git clone git@bitbucket.org:rooxteam/cra-template-rooxteam.git`

### 1.2 Рабочий процесс
* Имя ветки для production релизов: origin/master 
* Имя ветки для "следующего релиза" находящегося в разработке: develop 
* Префикс ветки нового функционала: feature/ 
* Префикс ветки для исправления ошибки: bugfix/ 
* Префикс ветки для релиза: release/ 
* Префикс ветки для исправления небольшой ошибки: hotfix/ 
* Префикс ветки для поддержки: support/ 

### 1.3 Версионирование
В соответствии с Semantic Versioning - https://semver.org/

## 2. Начало работы
### 2.1 Установка
Данный репозиторий содержит шаблон для библиотеки `create-react-app`, пока репозиторий не выложен в https://www.npmjs.com/ создать проект можно следуюющей командой в терминале:
 
`npx create-react-app my-app --template file:./path/to/cra-template-rooxteam`

### 2.2 Запуск
Используйте команды ниже для запуска приложения:

`npm start`
или
`yarn start`

Для сборки приложения запустите:

`npm run build`
или
`yarn run build`

### 2.3 Проверка ESLint/stylelint предупреждений
Для того, чтобы проверить код на ошибки ESLint используйте следующую команду.
По умолчанию она используется библиотекой Husky перед каждым коммитом, не давая вам закоммитить код с предупреждениями или ошибками.

`yarn run lint` - проверка eslint и stylelint

`yarn run lint-fix` - проверка и исправление eslint и stylelint 

`yarn run lint-staged` - проверка и исправление eslint и stylelint индексированных файлов

`yarn run stylelint` - проверка stylelint

`yarn run stylelint-fix` - проверка и исправление stylelint
 

## 2. Ветки и виды шаблонов
### 2.1 Данный шаблон включает три ветки, каждая из которых расширяет предыдущую:

1. `master/develop` - базовый шаблон, содержащий только конфигурационные файлы
2. `feature/app-structure` - шаблон, расширенный структурой приложения. Содержит основные директории, использующиеся в проекте в папке `src`, например `pages` или `components`. Не включает в себя `redux store`
3. `feature/redux` - шаблон, включающий в себя базовый, структуру приложения + настроенное redux хранилище. В папку `store` содержатся все необходимые компоненты для работы хранилища, например, `actions`, `reducers`, `sagas` и др.

### 2.2 Список основных библиотек и особенностей в каждом из шаблонов:

### 2.2.1 `master/develop`

1. enzyme - библиотека для написания тестов
2. node-sass - для работы css-modules
3. react, react-dom, react-router-dom, react-scripts - основные библиотеки для работы React и роутинга
4. react-app-rewired - позволяет расширить конфиг Webpack без eject. Доработанный конфиг содержится в файле `config-overrides.js`
5. cypress - Библиотека для написание e2e тестов

#### Стили
Стили реализованы через `scss` + `css-modules`. Файл именуется следующим образом: `PageName.module.scss`

#### .gitkeep
Файл `.gitkeep` в директориях проекта существует только для отображения папок в гите. При наполнении той или иной папки файл можно удалить

#### Config
В папке `src/configs` находится адаптер конфигураций проекта. На staging/production конфигурация поставляется сервером через глобальную переменную `roox_config`.
При локальной разработке используется файл `localCongig.js`

### 2.2.2 `feature/app-structure`

Содержит все библиотеки из базового шаблона, а также:
1. axios - библиотека для отправки запросов

Описание структуры:
1. `assets` - иконки, картинки, шрифты и любые другие вспомогательные ресурсы приложения
2. `components` - общие компоненты, которые используются в приложении. Не настолько глобальные, чтобы переместиться в UIKit, но встречаются достаточно часто, чтобы попасть в эту папку
3. `configs` - основные конфигурации
4. `hocs` - любые функции высшего порядка, в которые оборачиваются компоненты
5. `pages` - основные страницы приложения. Одна папка внутри - одна страница.
Каждая папка страницы состоит из папки `components` (компоненты, относящиеся только к этой странице) и файлов `PageName.jsx` и `PageName.module.scss`.
В ветке `feature/redux` здесь также должна лежать папка `effects`, которая содержит все, что касается хранилища и сайд-эффектов для этой страницы. 
6. `styles` - базовые стили в `index.scss` и файл с темой `theme.scss`, который содержит основные цвета из дизайна. Этот файл должен быть импортирован в любом scss-файле страницы, чтобы использовать оттуда все цвета и любые другие переменные.
7. `utils` - любые побочные функции, которые можно отнести к утилитам
8. `redux` - папка в которой хранятся ducks. Каждый duck содержит в себе файлы одной сущности (reducer, sagas, actions, etc).

### 2.2.3 `feature/redux`

Содержит все библиотеки, перечисленные выше, а также:
1. history - библиотека, необходимая для настройки навигации через actions, например из `redux-saga`
2. redux, react-redux - основные библиотеки redux-хранилища
3. redux-actions - библиотека для более комфортной работы с redux-действиями
4. redux-devtools-extension - для подключения инструментов разработчика в браузере
5. redux-saga - для обработки асинхронных сайд-эффектов, например запросов на сервер

#### Code Splitting
С целью реализовать code-splitting при загрузке страниц в проекте может использоваться `React.lazy()`.
В `src/pages/routes` для его реализации используется функция `LoadPage`, которая принимает в себя название страницы, обращается в папку с соответствующим названием и достает оттуда файл нужной страницы,
одновременно загружая редюсер и сагу (если используется шаблон feature/redux).

## 3. Список технологий
### 1) React (v 16.8.6)
Одним из главных последних нововведений  являются хуки. Они позволяют полностью отказаться от использования классовых
компонентов и перейти на функциональные. По словам авторов классы плохо минимизируются, а горячая перезагрузка
делает их ненадежными. Функционал хуков имеет все возможности для использование стейта и вызова сайд эффектов.
Рекомендуется использовать для разработки именно hooks.

### 2) Redux (v 4.0.4)
Redux является одним из самых популярных контейнером состояния приложения. Позволяет хранить все состояние приложения 
в одном месте (store). Все компоненты подписанные на редакс стор будут получать последние изменения. Таким образом,
Redux делает поток данных более понятным.

Одной из альетернатив является MobX. Плюсом является то, что писать код быстрее, 
но редакс намного проще поддается отладке.


### 3) React-redux (v 7.1)

Реакт-редакс позволяет связать компонент со стором, в последней версии добавлены хуки, которые позволяют
больше не оборачивать компонент в connect, что значительно ускоряет разработку.

### 4) Redux-saga (v 1.0.5)

Сага необходима для выполнения сайд-эффектов. Саги имеют преимущество при тестировании и позволяют организовывать сложные 
последовательности сайд-эффектов. Саги слушают все экшены, и "работают в фоне".

### 5) React-router-dom (v 5.0.1)

Библиотека нужна для создания многостраничных приложений. Отрисовывает разные компоненты в зависимости от того, 
какой путь в данный момент активен.В каждый момент времени только один из этих компонентов будет выведен
в элементе root. Таким образом, мы один раз монтируем корневой компонент, который меняет содержимое при изменении маршрута.
Также маршрутизатор меняет содержимое страницы без обращения на сервер и без перезагрузки всей страницы.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Example of authorization
Пример простейшей авторизации сделан на основе сохранения токена в cookie, пример можно посмотреть в duck'e `auth` и в компонентах `App` и `Login`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
