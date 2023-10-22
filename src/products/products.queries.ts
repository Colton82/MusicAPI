export const productQueries = {
    readProducts:
    'Select id AS productId, Name AS name, Quantity AS quantity, Price AS price, Category AS category FROM music_store.products',
    createProduct:
    'INSERT INTO PRODUCTS (Name, Quantity, Price, Category) VALUES(?,?,?,?)',
    updateProduct:
    'UPDATE products SET name = ?, Quantity = ?, Price = ?, Category = ? Where id = ?',
    deleteProduct:
    'DELETE FROM products WHERE id=?'

}