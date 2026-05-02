# Инструкция по восстановлению среды Claude Code

> Если читаешь это после переустановки Windows / Cloud Reinstall — открой этот файл в Claude Code и скажи: "восстанови среду по этому README". Я (Claude) знаю что делать.

---

## Контекст для будущего меня (Claude)

**Дата создания**: 2026-05-02
**Причина бэкапа**: Святослав делал Cloud Reinstall / In-Place Upgrade Windows 11 для починки повреждённой LSA/SAM (Audiosrv падал с `General access denied error`, `secedit /export` падал с `ERROR_NONE_MAPPED`). Network Profile тоже не работал — Windows Update показывал «нет интернета» при наличии связи. DISM / SFC / secedit reset не помогли — единственный путь был переустановка поверх.

**Пользователь**: Святослав Орлов (`Svyatoslav Orlov`)
- Telegram: `@ProductL77` (https://t.me/ProductL77)
- GitHub: `orlov11` (https://github.com/orlov11)
- Email: svyatoslav.orlov11@gmail.com
- Frontend Developer в Loov, Москва, удалёнка
- Глобальные правила общения и стиля кода — в `~/.claude/CLAUDE.md` (включён в бэкап)

---

## Где бэкап

```
E:\claude-backup-2026-05-02_18-11\
```

Содержит:
- `.claude\` — настройки Claude Code, плагины, история, проекты, глобальный CLAUDE.md (~591 MB)
- `.claude-mem\` — БД памяти claude-mem, ОБЯЗАТЕЛЬНА для сохранения истории сессий (~113 MB)
- `.cursor\` — Cursor IDE
- `.vscode\` — VS Code расширения и settings
- `AppData_Roaming_Code_User\` — VS Code user settings/keybindings/snippets
- `AppData_Roaming_Cursor_User\` — Cursor user settings (без workspaceStorage кэшей)
- `.gitconfig` — глобальный git config
- `.ssh\` — SSH ключи (если были)
- `.config\` — прочие dotfile-конфиги

---

## Как восстановить (пошагово для Claude)

### Шаг 1. Восстановить файлы из бэкапа

```powershell
$src = "E:\claude-backup-2026-05-02_18-11"
$dst = $env:USERPROFILE

robocopy "$src\.claude"     "$dst\.claude"     /MIR /NFL /NDL /NC /NS /NP
robocopy "$src\.claude-mem" "$dst\.claude-mem" /MIR /NFL /NDL /NC /NS /NP
robocopy "$src\.cursor"     "$dst\.cursor"     /MIR /NFL /NDL /NC /NS /NP
robocopy "$src\.vscode"     "$dst\.vscode"     /MIR /NFL /NDL /NC /NS /NP
robocopy "$src\AppData_Roaming_Code_User"   "$env:APPDATA\Code\User"   /MIR /NFL /NDL /NC /NS /NP
robocopy "$src\AppData_Roaming_Cursor_User" "$env:APPDATA\Cursor\User" /MIR /NFL /NDL /NC /NS /NP
Copy-Item "$src\.gitconfig" "$dst\.gitconfig" -Force
if (Test-Path "$src\.ssh") { robocopy "$src\.ssh" "$dst\.ssh" /MIR /NFL /NDL /NC /NS /NP }
```

### Шаг 2. Установить Claude Code (если нет)

```powershell
winget install Anthropic.ClaudeCode
```

### Шаг 3. Установить Node.js (для MCP)

```powershell
winget install OpenJS.NodeJS.LTS
```

### Шаг 4. Проверить плагины

После восстановления `.claude/settings.json` плагины подцепятся автоматом. Проверить:
```
/plugins
```

Должны быть включены:
- `superpowers@superpowers-marketplace` (github: `obra/superpowers-marketplace`)
- `claude-mem@thedotmack` (github: `thedotmack/claude-mem`)
- `document-skills@anthropic-agent-skills` (github: `anthropics/skills`)
- `example-skills@anthropic-agent-skills` (тот же репо)
- `ui-ux-pro-max@ui-ux-pro-max-skill` (github: `nextlevelbuilder/ui-ux-pro-max-skill`)

Если какой-то отвалился — `/plugin marketplace add <github-repo>` и `/plugin install <name>`.

### Шаг 5. MCP-серверы

Должны работать с восстановленных кэшей плагинов:
- `context7` — документация библиотек
- `playwright` — браузер
- `github` — GitHub API
- `filesystem` — файлы
- `fetch` — HTTP/Puppeteer
- `claude-mem` — поиск по памяти (через плагин thedotmack)

Команда: `/mcp`. Если требует auth — авторизоваться.

---

## Текущая работа над portfolio (на чём остановились)

**Репо**: `c:\Users\79777\portfolio` (Next.js 16 + Turbopack)

**Последняя сессия**: продуктовое ревью с Apple-фильтром нашло 18 проблем — все исправлены:
- Реальные контакты в `personal.ts`
- Hero с аватаром, magnetic CTA, новой копирайтинг
- About / Skills / Projects / Experience / Contacts отрефакторены
- Удалена отдельная секция AI-стек, объединена со Skills (категория "ai")
- Добавлен Education блок (Result School, Campfire School)
- Project detail: "Следующий проект" в конце
- Локаль-свитчер перенесён из шапки в футер (автодетект работает)
- Mobile menu анимирован
- Создан `src/components/ui/motion-primitives.tsx`: Reveal, Stagger, Magnetic, Tilt, GradientCover

**Build**: зелёный (npm run build, 18 static pages)

**Открытые задачи**:
1. Положить фото в `public/images/avatar.jpg` — Claude не пишет бинарники из чата. Сейчас Hero показывает инициалы СО на градиенте (fallback работает).
2. Опционально: реальные скриншоты проектов в `public/images/projects/<slug>.png`
3. Опционально: добавить пет-проекты в `src/data/experience.ts` (массив `petProjects`)
4. Warning из Next 16: `middleware` deprecated, переименовать в `proxy` — отдельная задачка

---

## Важные правила (из глобального CLAUDE.md)

- Общение на "ты", неформально, как с другом
- НЕ додумывать — если непонятно, спросить, а не строить предположения
- Senior-level код: BFF паттерн, минимизация ререндеров, строгая типизация (без `any`), осмысленные имена переменных
- При работе с portfolio — это НЕ тот Next.js, что в training data. Читать `node_modules/next/dist/docs/` перед написанием кода. См. `portfolio/AGENTS.md`.

---

## Если что-то не работает

1. Память от прошлых сессий не подтянулась → проверь что `.claude-mem\` в `~\.claude-mem\`, не в `~\.claude\.claude-mem\`
2. Плагины не появились → удали `~\.claude\plugins\cache\`, перезапусти Claude — плагины перекачаются из GitHub
3. MCP не отвечают → `/mcp` покажет статус. Если auth required — кликнуть авторизоваться
4. claude-mem не находит старые сессии → БД в `~\.claude-mem\` сломана. Бэкапа нет — увы. Но новая память накопится с нуля.
