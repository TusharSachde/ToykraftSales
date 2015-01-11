//VARIABLES NEEDED
var adminurl = "http://admin.toy-kraft.com/rest/index.php/";
var zone;

//CREATE THE DATABASE
var db = openDatabase('toykraftapp2', '1.0', 'toykraftapp DB', 50 * 1024 * 1024);

//CREATE ALL TABLES
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS ZONE (id Integer PRIMARY KEY, name, email)');
    console.log("created");
    //tx.executeSql('DROP DATABASE toykraftapp')
    //    /tx.executeSql('DROP TABLE ZONE');
});

console.log("ABHAY RISHI OMKAR");

var mydatabase = angular.module('mydatabase', [])
    .factory('MyDatabase', function ($http, $location, $cordovaNetwork, MyServices) {

        var statedata = [];
        var categorydata = [];
        if ($.jStorage.get("categoriesdata")) {
            var categorydata = $.jStorage.get("categoriesdata");
        };
        var orderid = 0;
        if ($.jStorage.get("offlineorderid")) {
            orderid = $.jStorage.get("offlineorderid");
        };


        return {

            findzonebyuser: function () {
                return $http.get(adminurl + "zone/find", {
                    params: {
                        user: user
                    }
                });
            },
            addzonedata: function (data) {
                db.transaction(function (tx) {
                    for (var i = 0; i < data.length; i++) {
                        var sqls = 'INSERT INTO ZONE (id , name, email) VALUES (' + data[i].id + ',"' + data[i].name + '","' + data[i].email + '")';
                        console.log(sqls);
                        tx.executeSql(sqls, [], function (tx, results) {
                            console.log("RAOW INSERTED");
                        }, null);
                    };
                    console.log("zones added");
                });
            },
            findzonebyuseroffline: function () {
                zone = user.zone;
            },

            createretailertables: function () {
                db.transaction(function (tx) {
                    //tx.executeSql('DROP TABLE STATE');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS STATE (id Integer PRIMARY KEY, zone, name)');
                    console.log("states created");
                });
                db.transaction(function (tx2) {
                    //tx2.executeSql('DROP TABLE CITY');
                    tx2.executeSql('CREATE TABLE IF NOT EXISTS CITY (id Integer PRIMARY KEY, state, name)');
                    console.log("City created");
                });
                db.transaction(function (tx3) {
                    //tx3.executeSql('DROP TABLE AREA');
                    tx3.executeSql('CREATE TABLE IF NOT EXISTS AREA (id Integer PRIMARY KEY, city, name, distributor)');
                    console.log("Area created");
                });
                db.transaction(function (tx5) {
                    tx5.executeSql('CREATE TABLE IF NOT EXISTS RETAILER (id INTEGER PRIMARY KEY,lat,long,area,dob,type_of_area,sq_feet,store_image,name,number,email,address,ownername,ownernumber,contactname,contactnumber,timestamp, sync)');
                    //tx5.executeSql('DROP TABLE RETAILER');
                    console.log("Retailer created");
                });
                db.transaction(function (tx6) {
                    tx6.executeSql('CREATE TABLE IF NOT EXISTS PRODUCT (id INTEGER PRIMARY KEY, name, product, encode, name2, productcode, category,video,mrp,description VARCHAR2(5000),age,scheme,isnew,timestamp)');
                    //tx6.executeSql('DROP TABLE PRODUCT');
                    console.log("Product created");
                });
                //orderid(generate), userid, retailerid, productid(many), quantity, mrp, totalprice
                db.transaction(function (tx7) {
                    tx7.executeSql('CREATE TABLE IF NOT EXISTS ORDERS (id INTEGER, userid INTEGER, retailerid INTEGER, productid INTEGER, quantity INTEGER, mrp, totalprice)');
                    //tx7.executeSql('DROP TABLE ORDERS');
                    console.log("Order Transaction Table created");
                });
            },
            syncinretailerstatedata: function () {
                return $http.get(adminurl + "state/find", {
                    params: {}
                })
                console.log(statedata);
            },
            insertretailerstatedata: function (data) {
                db.transaction(function (tx) {
                    for (var i = 0; i < data.length; i++) {
                        var sqls = 'INSERT INTO STATE (id , zone, name) VALUES (' + data[i].id + ',"' + data[i].zone + '","' + data[i].name + '")';
                        console.log(sqls);
                        tx.executeSql(sqls, [], function (tx, results) {
                            console.log("RAOW INSERTED");
                        }, null);
                    };
                });
            },
            syncinretailercitydata: function () {
                return $http.get(adminurl + "city/find", {
                    params: {}
                })
            },
            insertretailercitydata: function (data) {
                db.transaction(function (tx) {
                    for (var i = 0; i < data.length; i++) {
                        var sqls = 'INSERT INTO CITY (id , state, name) VALUES (' + data[i].id + ',"' + data[i].state + '","' + data[i].name + '")';
                        console.log(sqls);
                        tx.executeSql(sqls, [], function (tx, results) {
                            console.log("RAOW INSERTED");
                        }, null);
                    };
                });
            },
            syncinretailerareadata: function () {
                return $http.get(adminurl + "area/find", {
                    params: {}
                })
            },
            insertretailerareadata: function (data) {
                db.transaction(function (tx) {
                    for (var i = 0; i < data.length; i++) {
                        var sqls = 'INSERT INTO AREA (id , city, name) VALUES (' + data[i].id + ',"' + data[i].city + '","' + data[i].name + '")';
                        console.log(sqls);
                        tx.executeSql(sqls, [], function (tx, results) {
                            console.log("RAOW INSERTED");
                        }, null);
                    };
                });
            },
            syncinretailerdata: function () {
                return $http.get(adminurl + "retailer/find", {
                    params: {}
                })
            },

            /*id,lat,long,area,dob,type_of_area,sq_feet,store_image,name,number,email,address,ownername,ownernumber,contactname,contactnumber,timestamp, sync*/

            insertretailerdata: function (data) {
                db.transaction(function (tx) {
                    for (var i = 0; i < data.length; i++) {
                        var sqls = 'INSERT INTO RETAILER (id,lat,long,area,dob,type_of_area,sq_feet,store_image,name,number,email,address,ownername,ownernumber,contactname,contactnumber,timestamp, sync) VALUES ("' + data[i].id + '","' + data[i].lat + '","' + data[i].long + '","' + data[i].area + '","' + data[i].dob + '","' + data[i].type_of_area + '","' + data[i].sq_feet + '","' + data[i].store_image + '","' + data[i].name + '","' + data[i].number + '","' + data[i].email + '","' + data[i].address + '","' + data[i].ownername + '","' + data[i].ownernumber + '","' + data[i].contactname + '","' + data[i].contactnumber + '","' + data[i].timestamp + '", "true")';
                        console.log(sqls);
                        tx.executeSql(sqls, [], function (tx, results) {
                            console.log("RAOW INSERTED");
                        }, function (tx, results) {
                            console.log("RAOW NOT INSERTED");
                        });
                    };
                });
            },
            syncinproductdata: function () {
                return $http.get(adminurl + "product/find", {
                    params: {}
                })
            },
            insertproductdata: function (data) {
                db.transaction(function (tx) {
                    for (var i = 0; i < data.length; i++) {
                        var sqls = 'INSERT INTO PRODUCT (id, name, product, encode, name2, productcode, category,video,mrp,description,age,scheme,isnew,timestamp) VALUES (' + data[i].id + ',"' + data[i].name + '","' + data[i].product + '","' + data[i].encode + '","' + data[i].name2 + '","' + data[i].productcode + '","' + data[i].category + '","' + data[i].video + '","' + data[i].mrp + '","' + data[i].description + '","' + data[i].age + '","' + data[i].scheme + '","' + data[i].isnew + '","' + data[i].timestamp + '")';
                        console.log(sqls);
                        tx.executeSql(sqls, [], function (tx, results) {
                            console.log("PRODUCT RAOW INSERTED");
                        }, function (tx, results) {
                            console.log("PRODUCT RAOW NOT INSERTED");
                        });
                    };
                });
            },
            synccategorydata: function (data) {
                $.jStorage.set("categoriesdata", data);
                console.log(data);
                categorydata = data;
            },
            getcategoriesoffline: function () {
                return categorydata;
            },
            sendcartoffline: function (orid, ouid, ocart) {
                //orderid(generate), userid, retailerid, productid(many), quantity, mrp, totalprice
                //cart=[];
                if ($.jStorage.get("offlineorderid") > 0) {
                    orderid = $.jStorage.get("offlineorderid");
                } else {
                    orderid = 0
                };
                orderid += 1;
                $.jStorage.set("offlineorderid", orderid);
                db.transaction(function (tx) {
                    for (var i = 0; i < ocart.length; i++) {
                        var sqls = 'INSERT INTO ORDERS (id, userid, retailerid , productid , quantity , mrp, totalprice) VALUES (' + orderid + ',' + ouid + ',' + orid + ',' + ocart[i].id + ',' + ocart[i].quantity + ',"' + ocart[i].mrp + '","' + ocart[i].totalprice + '")';
                        console.log(sqls);
                        tx.executeSql(sqls, [], function (tx, results) {
                            console.log('added ' + i + ' products with order id ' + orderid);
                        }, function (tx, results) {
                            console.log('did not add product with name' + ocart.name);
                        });
                    };
                });
            },
            syncsendorders: function () {
                var numorders = 0;
                var orderrid, orderuid;
                //find maximum number in order number
                db.transaction(function (tx) {
                    var sqls = 'SELECT max(id) as maxorder FROM ORDERS';
                    console.log(sqls);
                    tx.executeSql(sqls, [], function (tx, results) {
                        numorders = parseInt(results.rows.item(0).maxorder);
                    }, function (tx, results) {});

                });
                //see if it is greater than 0
                if (numorders > 0) {
                    console.log("greater");
                    //start from 1 to greates number
                    for (var j = 1; j == numorders; j++) {
                        db.transaction(function (tx2) {
                            var sqls = 'SELECT retailerid FROM ORDERS WHERE id=='+j;
                            console.log(sqls);
                            tx2.executeSql(sqls, [], function (tx2, results2) {
                                console.log(results2.rows.item(0).retailerid);
                            }, function (tx2, results2) {});

                        });
                        
                    };
                };



                //where 1, take retailer id, user id, take product id (make array, keep pushing) and delete that row
                //make array of retailerid and user id, cart
                //send the order
                //next
            },


        }
    });