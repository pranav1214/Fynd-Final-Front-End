import Router from "vue-router";

import AppLogin from "@/components/AppLogin";
import Products from "@/components/Products";
import AppSignup from "@/components/AppSignup";
import Admin from "@/components/Admin";
import PageNotFound from "@/components/PageNotFound";
import ProductDetail from "@/components/ProductDetail";
import AddProduct from "@/components/AddProduct";
import EditProduct from "@/components/EditProduct";
import EditProductDetail from "@/components/EditProductDetail";
import store from "../store";

// const meta = {
//     authorize: [],
// };

const router = new Router( {
    mode: "history",
    routes: [
        {
            name: "login",
            path: "/login",
            component: AppLogin
        },
        {
            name: "products",
            path: "/",
            component: Products,
            meta: { adminAuth: false, generalAuth: true  }
        },
        {
            name: "signup",
            path: "/signup",
            component: AppSignup
        },
        {
            name: "admin",
            path: "/admin",
            component: Admin,
            meta: { requiresAuth: true, adminAuth: true, generalAuth: false  },

            children: [
                {
                    name: "addproduct",
                    path: "",
                    component: AddProduct,
                    meta: { requiresAuth: true, adminAuth: true, generalAuth: false  }
                },
                {
                    name: "editproduct",
                    path: "/admin/edit",
                    component: EditProduct,
                    // meta: { requiresAuth: true, adminAuth: true, generalAuth: false  }
                },
                {
                    name: "editproductdetail",
                    path: "/admin/edit/:id",
                    component: EditProductDetail,
                    // meta: { requiresAuth: true, adminAuth: true, generalAuth: false  }
                }
            ]
        },
        {
            name: "product-details",
            path: "/products/:id",
            component: ProductDetail
        },
        {
            name: "page-not-found",
            path: "*",
            component: PageNotFound
        }
    ]
} );


//Global auth guard
router.beforeEach( ( to, from, next ) => {
    console.log( store.getters.isAuthenticated );
    if( to.meta.requiresAuth ){
        const authUser = JSON.parse( window.localStorage.getItem( 'lbitem' ) );
        if( !authUser || !authUser.token ){
            next( '/login' )
        }else if( to.meta.adminAuth ){
            const authUser = JSON.parse( window.localStorage.getItem( 'lbitem' ) );
            if( authUser.data.role === 'admin' ){
                next( '/admin' );
            }else{
                next( '/' );
            }
        }else if( to.meta.generalAuth ){
            const authUser = JSON.parse( window.localStorage.getItem( 'lbitem' ) )
            if( authUser.data.role === 'general' ){
                next( '/' );
            }else{
                console.log( 'Admin logged in' );
                next( '/admin' );
            }
        }
    }
    //  if( to.meta.authorize && !store.getters.isAuthenticated ) {
    //      const authUser = JSON.parse( window.localStorage.getItem( 'lbitem' ) );
    //      console.log( authUser.data.role )
    //     next( {
    //         name: "login",
    //     } );
    // }
    else{
        next();
    }
} );

export default router;
