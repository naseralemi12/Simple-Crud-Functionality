const addButton = document.getElementById('addButton');
const saveButton = document.getElementById('saveButton');
const dialog = document.querySelector('dialog');
const cancelButton = document.getElementById('cancelButton');
const deleteDialog = document.getElementById('deleteDialog');
let selectedRow = null;

addButton.addEventListener('click', () => {
    if (dialog.showModal) {
        dialog.showModal();
    }
});

cancelButton.addEventListener('click', () => {
    dialog.close();
});

const onFormSubmit = () => {
    const dialogInput = {
        title: document.getElementById('title').value,
        date: document.getElementById('date').value,
        summary: document.querySelector('textarea').value,
    };
    if (selectedRow === null) {
        const table = document.getElementById('blogList').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow(table.length);
        const cell1 = newRow.insertCell(0);
        cell1.innerHTML = dialogInput.title;
        const cell2 = newRow.insertCell(1);
        cell2.innerHTML = dialogInput.date;
        const cell3 = newRow.insertCell(2);
        cell3.innerHTML = dialogInput.summary;
        const cell4 = newRow.insertCell(3);
        cell4.innerHTML = `<a onClick="onEdit(this)"><img src="./images/edit.png" width="20px" height="20px" alt="Edit" /></a>
                       <a onClick="onDelete(this)"><img src="./images/delete.png" width="20px" height="20px" alt="Delete"/></a>`;
    } else {
        selectedRow.cells[0].innerHTML = dialogInput.title;
        selectedRow.cells[1].innerHTML = dialogInput.date;
        selectedRow.cells[2].innerHTML = dialogInput.summary;
    }
    resetForm();
};

const resetForm = () => {
    document.getElementById('title').value = '';
    document.getElementById('date').value = '';
    document.querySelector('textarea').value = '';
    selectedRow = null;
};

const onEdit = (td) => {
    selectedRow = td.parentElement.parentElement;
    document.getElementById('title').value = selectedRow.cells[0].innerHTML;
    document.getElementById('date').value = selectedRow.cells[1].innerHTML;
    document.querySelector('textarea').value = selectedRow.cells[2].innerHTML;
    dialog.showModal();
};

const onDelete = (td) => {
    deleteDialog.showModal();
    deleteDialog.addEventListener('close', () => {
        if (deleteDialog.returnValue === 'Delete') {
            const row = td.parentElement.parentElement;
            document.getElementById('blogList').deleteRow(row.rowIndex);
            resetForm();
        }
    });
};