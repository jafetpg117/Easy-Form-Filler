chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: fillFormWithRandomUserData
    });
});

async function fillFormWithRandomUserData() {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0];

    const faker = {
        getEmail: () => user.email,
        getPhone: () => user.phone,
        getFirstName: () => user.name.first,
        getLastName: () => user.name.last,
        getAddress: () => `${user.location.street.number} ${user.location.street.name}, ${user.location.city}`,
        getText: () => `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${Math.floor(Math.random() * 1000)}`
    };

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.type === 'email') {
            input.value = faker.getEmail();
        } else if (input.type === 'tel') {
            input.value = faker.getPhone();
        } else if (input.type === 'text') {
            if (input.name.toLowerCase().includes('name') && !input.name.toLowerCase().includes('last')) {
                input.value = faker.getFirstName();
            } else if (input.name.toLowerCase().includes('last') || input.name.toLowerCase().includes('surname')) {
                input.value = faker.getLastName();
            } else if (input.name.toLowerCase().includes('address')) {
                input.value = faker.getAddress();
            } else {
                input.value = faker.getText();
            }
        } else if (input.type === 'number') {
            input.value = Math.floor(Math.random() * 100);
        }
    });

    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.value = faker.getText();
    });
}
