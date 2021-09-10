window.Cart = {

    API_URL: "http://localhost:8085",

    getCart: function () {

        const userId = 1;

        $.ajax({
            url: Cart.API_URL + "/carts/" + userId
        }).done(function (response) {
            Cart.displayProductsInCart(response.products);
        });
    },

    getProductCartRow: function (product) {
        return `
                                <tr>
                            <td class="thumbnail-img">
                                <a href="#">
                                    <img class="img-fluid" src=${product.imageUrl} alt=""/>
                                </a>
                            </td>
                            <td class="name-pr">
                                <a href="#">
                                    ${product.name}
                                </a>
                            </td>
                            <td class="price-pr">
                                <p>Ron ${product.price}</p>
                            </td>
                            <td class="quantity-box"><input type="number" size="4" value="1" min="0" step="1"
                                                            class="c-input-text qty text"></td>
                            <td class="total-pr">
                                <p>Ron ${product.price}</p>
                            </td>
                            <td class="remove-pr">
                                <a href="#">
                                    <i class="fas fa-times"></i>
                                </a>
                            </td>
                        </tr>
        `
    },
    displayProductsInCart: function (products) {
        let cartTableBody = '';

        products.forEach(product => cartTableBody += Cart.getProductCartRow(product));

        $('.table').html(cartTableBody)
    }
}

Cart.getCart();
