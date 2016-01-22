# Servers UI
# Task:
"Server" object has properties: IP, name, current version
Create List View for all available servers
Operations: Create, Edit, Delete, Update version, Restart

- When user clicks on "Update version" -> Dropdown with available versions is shown + Button "Update" (all it does is changes version property in object)
- When user clicks "Restart", Loading dialog is shown for few seconds and then toast message with some text is shown
- Use localStorage to save data (create service which is used to access localStorage, keep in mind that it should be possible to easily change it to service with server interaction)
- Code should be structured by components
- Use Bootstrap
- Add filter by Current Version for the list
