const addButton = document.getElementById('addButton');
const saveButton = document.getElementById('saveButton');
const dialog = document.querySelector('dialog');
const cancelButton = document.getElementById('cancelButton');
const deleteDialog = document.getElementById('deleteDialog');
const blogList = document.getElementById('blogList');
let selectedRow = null;

// Load data from local storage on page load
window.addEventListener('load', () => {
    const data = JSON.parse(localStorage.getItem('blogPosts')) || [];
    data.forEach((blogPost) => {
        const newRow = blogList.insertRow();
        newRow.innerHTML = `
      <td>${blogPost.title}</td>
      <td>${blogPost.date}</td>
      <td>${blogPost.summary}</td>
      <td>
        <a onClick="onEdit(this)">
          <img src="./images/edit.png" width="20px" height="20px" alt="Edit" />
        </a>
        <a onClick="onDelete(this)">
          <img src="./images/delete.png" width="20px" height="20px" alt="Delete" />
        </a>
      </td>
    `;
    });
});

// Save data to local storage
const saveData = (data) => {
    localStorage.setItem('blogPosts', JSON.stringify(data));
};

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
        // Add new blog post
        const newRow = blogList.insertRow();
        newRow.innerHTML = `
      <td>${dialogInput.title}</td>
      <td>${dialogInput.date}</td>
      <td>${dialogInput.summary}</td>
      <td>
        <a onClick="onEdit(this)">
          <img src="./images/edit.png" width="20px" height="20px" alt="Edit" />
        </a>
        <a onClick="onDelete(this)">
          <img src="./images/delete.png" width="20px" height="20px" alt="Delete" />
        </a>
      </td>
    `;
        // Save data to local storage
        const data = JSON.parse(localStorage.getItem('blogPosts')) || [];
        data.push(dialogInput);
        saveData(data);
    } else {
        // Edit existing blog post
        selectedRow.cells[0].innerHTML = dialogInput.title;
        selectedRow.cells[1].innerHTML = dialogInput.date;
        selectedRow.cells[2].innerHTML = dialogInput.summary;
        // Save data to local storage
        const data = JSON.parse(localStorage.getItem('blogPosts')) || [];
        const index = selectedRow.rowIndex - 1;
        data[index] = dialogInput;
        saveData(data);
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
            // Get the current data from localStorage
            let blogs = JSON.parse(localStorage.getItem('blogPosts')) || [];

            // Find the index of the row to be deleted in the blogs array
            let index = blogs.findIndex((blog) => blog.title === row.cells[0].textContent && blog.date === row.cells[1].textContent && blog.summary === row.cells[2].textContent);

            // Remove the blog from the blogs array and update localStorage
            if (index !== -1) {
                blogs.splice(index, 1);
                localStorage.setItem('blogPosts', JSON.stringify(blogs));
            }
        }
    });
};