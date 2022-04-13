# react-hook-form-test

Test bench for getting the usage flow right for an auto-submit form.

## Features

- filter
  - single-select
  - initially no selection
  - placeholder "Select filter..."
  - required
- title
  - text input
  - initially empty
- Save button
  - if no selection in filter:
    - sets focus on title
  - if no text in title:
    - activates title placeholder: "Enter title and click Save again..."
    - sets focus on title
    - skips saving

Any field change performs a form submit if all required fields have a value/selection.

## Running

- clone repo
- cd react-hook-form-test
- npm install
- npm run dev
- open http://localhost:3000