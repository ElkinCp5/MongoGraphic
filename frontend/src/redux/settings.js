let settings = {
    theme: "light",
    collectionId: 0,
    collections:[
            {
                title: "User",
                namespace: "App/User",
                date: "20/10/2019",
                code: `{
                    "name": "string",
                    "email": "string",
                    "password": "string",
                    "avatar": "string"
                }`,
                documents: [
                    `{
                        "name": "Jhon Marino",
                        "email": "jhon_marino@gmail.com",
                        "password": "12340",
                        "avatar": "not"
                    }`,
                    `{
                        "name": "Jhon David",
                        "email": "jhon.david@gmail.com",
                        "password": "12340",
                        "avatar": "not"
                    }`,
                    `{
                        "name": "Casimiro",
                        "email": "casimiro@gmail.com",
                        "password": "12340",
                        "avatar": "not"
                    }`
                ]
            },
            {
                title: "Employers",
                namespace: "App/Employer",
                date: "20/10/2019",
                code: `{ 
                    "name": "String",
                    "lasname": "String",
                    "gender": "String",
                    "avatar": "String"
                }`,
                documents: [
                    `{
                        "name": "Jhon Marino",
                        "lasname": "Cordoba Mena",
                        "gender": "12340",
                        "avatar": "not"
                    }`,
                   ` {
                        "name": "Jhon Marino",
                        "lasname": "Potes Mosquera",
                        "gender": "12340",
                        "avatar": "not"
                    }`,
                    `{
                        "name": "Jhon Marino",
                        "lasname": "Chaverra portocarrero",
                        "gender": "12340",
                        "avatar": "not"
                    }`
                ]
            },
            {
                title: "Products",
                namespace: "App/Product",
                date: "20/10/2019",
                code: `{ 
                    "name": "String",
                    "value": "String",
                    "code": "number",
                    "descount": "String"
                }`,
                documents: [
                    `{
                        "name": "Jhon Marino",
                        "value": "Cordoba Mena",
                        "code": "12340",
                        "descount": "not"
                    }`,
                    `{
                        "name": "Jhon Marino",
                        "value": "Cordoba Mena",
                        "code": "12340",
                        "descount": "not"
                    }`,
                    `{
                        "name": "Jhon Marino",
                        "value": "Cordoba Mena",
                        "code": "12340",
                        "descount": "not"
                    }`
                ]
            },
            {
                title: "Services",
                namespace: "App/Service",
                date: "20/10/2019",
                code: `{ 
                    "name": "String",
                    "value": "number",
                    "code": "number",
                    "descount": "String"
                 }`,
                documents: [
                   ` {
                        "name": "Lavada normal",
                        "value": "5.000",
                        "code": "12340",
                        "descount": "not"
                    }`,
                    `{
                        "name": "Lavada brillada",
                        "value": "8.000",
                        "code": "12340",
                        "descount": "not"
                    }`,
                    `{
                        "name": "Lavada genersl",
                        "value": "10.000",
                        "code": "12340",
                        "descount": "not"
                    }`,
                ]
            }
    ],
    subRouters: [
        {
          url: '/cpanel',
          key: 'dashboard'
        },
        {
          url: '/cpanel/collections',
          key: '/cpanel/collection'
        },
        {
          url: '/cpanel/plugins',
          key: 'dashboard'
        },
        {
          url: '/cpanel/connections',
          key: 'connection'
        },
        {
          url: '/cpanel/settings',
          key: 'setting'
        }
    ]
}


export default settings;