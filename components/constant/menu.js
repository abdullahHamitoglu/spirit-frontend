
export const MENUITEMS = [
  {
    title: "home",
    path: "/",
    type: "link",
  },
  {
    title: "shop",
    path:"/Products",
    type: "link",
  },
  {
    title: "products",
    type: "sub",
    children: [
      {
        title: "Sidebar",
        type: "sub",
        children: [
          { path: "/product-details/1", title: "Left Sidebar", type: "link" },
          { path: "/product-details/right_sidebar", title: "Right Sidebar", type: "link" },
          { path: "/product-details/no-sidebar", title: "No Sidebar", type: "link" },
        ],
      },
      {
        title: "Thumbnail Image",
        type: "sub",
        children: [
          { path: "/product-details/thumbnail_left", title: "Left Image", type: "link" },
          { path: "/product-details/thumbnail_right", title: "Right Image", type: "link" },
          { path: "/product-details/thumbnail_outside", title: "Image Outside", type: "link" },
        ],
      },
      {
        title: "3-Column",
        type: "sub",
        children: [
          { path: "/product-details/3_col_left", title: "Thumbnail Left", type: "link" },
          { path: "/product-details/3_col_right", title: "Thumbnail Right", type: "link" },
          { path: "/product-details/3_col_bottom", title: "Thumbnail Bottom", type: "link" },
        ],
      },
      {
        path: "/product-details/4_image",
        title: "4 Image",
        type: "link",
        tag: "New",
      },
      {
        path: "/product-details/bundle_product",
        title: "Bundle Product",
        type: "link",
        tag: "New",
      },
      {
        path: "/product-details/sticky",
        title: "Sticky",
        type: "link",
      },
      {
        path: "/product-details/accordian",
        title: "Accordian",
        type: "link",
      },
      {
        path: "/product-details/image_swatch",
        title: "Image Swatch",
        type: "link",
        tag: "New",
      },
      {
        path: "/product-details/vertical_tab",
        title: "Vertical Tab",
        type: "link",
      },
    ],
  },
  {
    title: "features",
    megaMenu: true,
    megaMenuType: "small",
    type: "sub",
    children: [
      {
        title: "Portfolio",
        type: "sub",
        children: [
          { path: "/portfolio/grid-2", title: "Portfolio Grid 2", type: "link", icon: "alert" },
          { path: "/portfolio/grid-3", title: "Portfolio Grid 3", type: "link", icon: "layout-accordion-merged" },
          { path: "/portfolio/grid-4", title: "Portfolio Grid 4", type: "link", icon: "layers" },
          { path: "/portfolio/masonry-grid-2", title: "masonry Grid 2", type: "link", icon: "write" },
          { path: "/portfolio/masonry-grid-3", title: "masonry Grid 3", type: "link", icon: "map-alt" },
          { path: "/portfolio/masonry-grid-4", title: "masonry Grid 4", type: "link", icon: "map-alt" },
          { path: "/portfolio/masonry-full-width", title: "masonry Full Width", type: "link", icon: "map-alt" },
        ],
      },
      {
        title: "Add To Cart",
        type: "sub",
        children: [
          { path: "/layouts/Nursery", title: "Cart Modal Popup", type: "link", icon: "list" },
          { path: "/layouts/Vegetables", title: "Qty Counter", type: "link", icon: "gallery" },
          { path: "/layouts/Bags", title: "Cart Top", type: "link", icon: "money" },
          { path: "/layouts/Shoes", title: "Cart Bottom", type: "link", icon: "time" },
          { path: "/layouts/Watch", title: "Cart Left", type: "link", icon: "alarm-clock" },
          { path: "/layouts/Tools", title: "Cart Right", type: "link", icon: "alarm-clock" },
        ],
      },
      {
        title: "Theme Element",
        type: "sub",
        children: [
          { path: "/portfolio/title", title: "Title", type: "link", icon: "bar-chart" },
          { path: "/portfolio/collection-banner", title: "Collection Banner", type: "link", icon: "thought" },
          { path: "/portfolio/home-slider", title: "Home Slider", type: "link", icon: "video-camera" },
          { path: "/portfolio/category", title: "Category", type: "link", icon: "headphone" },
          { path: "/portfolio/service", title: "Service", type: "link", icon: "headphone" },
        ],
      },
      {
        title: "Product Element",
        type: "sub",
        children: [
          { path: "/portfolio/product-box", title: "Product Box", type: "link", icon: "bar-chart" },
          { path: "/portfolio/product-slider", title: "Product Slider", type: "link", icon: "thought" },
          { path: "/portfolio/no-slider", title: "No Slider", type: "link", icon: "video-camera" },
          { path: "/portfolio/multi-slider", title: "Multi Slider", type: "link", icon: "headphone" },
          { path: "/portfolio/tab", title: "Tab", type: "link", icon: "headphone" },
        ],
      },
      {
        title: "Email Template",
        type: "sub",
        children: [
          { path: "/portfolio/order-success", title: "Order Success", type: "link", icon: "bar-chart" },
          { path: "/portfolio/order-success-2", title: "Order Success 2", type: "link", icon: "thought" },
        ],
      },
    ],
  },
  {
    title: "Pages",
    type: "sub",
    children: [
      {
        title: "vendor",
        type: "sub",
        tag: "new",
        children: [
          { path: "/page/vendor/vendor-dashboard", title: "Vendor Dashboard", type: "link" },
          { path: "/page/vendor/vendor-profile", title: "Vendor Profile", type: "link" },
          { path: "/page/vendor/become-vendor", title: "Become Vendor", type: "link" },
        ],
      },
      {
        title: "Account",
        type: "sub",
        children: [
          { path: "/account/wishlist", title: "Wishlist", type: "link" },
          { path: "/account/cart", title: "cart", type: "link" },
          { path: "/account/dashboard", title: "dashboard", type: "link" },
          { path: "/account/login", title: "login", type: "link" },
          { path: "/account/login-auth", title: "login-auth", type: "link" },
          { path: "/account/register", title: "register", type: "link" },
          { path: "/account/contact", title: "contact", type: "link" },
          { path: "/account/forget-pwd", title: "forgot-password", type: "link" },
          { path: "/account/profile", title: "profile", type: "link" },
          { path: "/account/checkout", title: "checkout", type: "link" },
        ],
      },
      { path: "/page/about-us", title: "about-us", type: "link" },
      { path: "/page/search", title: "search", type: "link" },
      { path: "/page/typography", title: "typography", type: "link", tag: "new" },
      { path: "/page/review", title: "review", type: "link" },
      { path: "/page/order-success", title: "order-success", type: "link" },
      {
        title: "compare",
        type: "sub",
        children: [
          { path: "/page/compare", title: "compare", type: "link" },
          { path: "/page/compare-2", title: "compare-2", type: "link", tag: "new" },
        ],
      },
      { path: "/page/collection", title: "collection", type: "link" },
      { path: "/page/lookbook", title: "lookbook", type: "link" },
      { path: "/page/site-map", title: "site-map", type: "link" },
      { path: "/page/404", title: "404", type: "link" },
      { path: "/page/coming-soon", title: "coming-soon", type: "link" },
      { path: "/page/faq", title: "faq", type: "link" },
    ],
  },
  {
    title: "blogs",
    type: "sub",
    children: [
      { path: "/blogs/blog_left_sidebar", title: "blog left sidebar", type: "link" },
      { path: "/blogs/blog_right_sidebar", title: "blog right sidebar", type: "link" },
      { path: "/blogs/no_sidebar", title: "no sidebar", type: "link" },
      { path: "/blogs/blog_detail", title: "blog detail", type: "link" },
    ],
  },
];
