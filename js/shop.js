window.Shop = {

    API_URL: "http://localhost:8085",

    getProducts: function () {
        $.ajax({
            url: Shop.API_URL + "/products",
            method: "GET"
        }).done(function (response) {
            Shop.displayProducts(response.content);
        });
    },

    addProductToCart: function (productId) {
        const userId = 1;

        const requestBody = {
            userId: userId,
            productId: productId
        }
        $.ajax({
            url: Shop.API_URL + "/carts",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            window.location.replace("cart.html");
        })
    },

    getProductHtml: function (product) {
        return `
                                        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                                            <div class="products-single fix">
                                                <div class="box-img-hover">
<!--                                                    <div class="type-lb">-->
<!--                                                        <p class="sale">Sale</p>-->
<!--                                                    </div>-->
                                                    <img src="${product.imageUrl}" class="img-fluid" alt="Image">
                                                    <div class="mask-icon">
                                                        <ul>
                                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i class="fas fa-eye"></i></a></li>
                                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i class="fas fa-sync-alt"></i></a></li>
                                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i class="far fa-heart"></i></a></li>
                                                        </ul>

                                                            <a class="cart" data-quantity="1" data-product_id="${product.id}" rel="nofollow" href="#">Add to Cart</a>

                                                    </div>
                                                </div>
                                                <div class="why-text">
                                                    <h4>${product.name}</h4>
                                                    <h5> Ron ${product.price}</h5>
                                                </div>
                                            </div>
                                        </div>
        `
    },
    displayProducts: function (products) {
        let productsHtml = '';

        products.forEach(product => productsHtml += Shop.getProductHtml(product));

        $('.shop-box-inner .product-categorie-box .tab-content .tab-pane:first-child .row:first-child')
            .html(productsHtml);
    },
    bindEvents: function () {
        $('.shop-box-inner .product-categorie-box .tab-content .tab-pane:first-child .row:first-child')
            .delegate('.cart', 'click', function (event) {
                event.preventDefault();

                let productId = $(this).data('product_id');

                Shop.addProductToCart(productId);
            });

    }
};

Shop.getProducts();
Shop.bindEvents();
