const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
    return layout({
        content: `
        <form method="POST" enctype="multipart/form-data">
            <input name="title" placeholder="Title">
            <input name="price" placeholder="Price">
            <input name="image" type="file">
            <button>Create Product</button>
        </form>
        `
    });
};