// APPLICATION

Class("Application", {
    Application: function(moduleName, dependencies) {
        try {
            this.moduleName = moduleName;
            this.dependencies = dependencies;
            if (angular) {
                this.module = angular.module(this.moduleName, this.dependencies);//.config('$routeProvider', this.route);
            }
        } catch (ex) {
            console.log(ex);
        }
    },

    config: function(method) {
        this.module.config('$routeProvider', method);
    },

    route: function($routeProvider) {
        //do stuff with angular router
    }
});

// CONTROLLER

Class("Controller", {
    Controller: function(modulename, name, vars, dependencies) {
        //storing module and controller name
        this.modulename = modulename;
        this.name = name;
        this.dependencies = dependencies;
        //ensuring angular is here
        if (angular) {
            // if we provide dependencies, we want to create a new module
            // if we don't provide dependencies, we are retrieving reference to the module itthis
            var toCreate = this.dependencies ? true : false;
            var module;
            if (toCreate) {
                //is already created?
                try {
                    this.module = angular.module(this.modulename);
                } catch (e) {
                    // this module has never been created, create it now
                    this.module = angular.module(this.modulename, this.dependencies);
                }
            } else {
                //can we retrieve this module?
                try {
                    this.module = angular.module(this.modulename);
                } catch (e) {
                    // we can't retrieve this module, create one with no dep
                    this.module = angular.module(this.modulename, []);
                }
            }
            // we're sure this module can be handled correctly
            // creating the controller
            var _vars = vars;
            _vars.push(this.control);
            //console.log(_vars);
            this.module.controller(this.name, _vars);
        }
    },

    control: function($scope) {
        //console.log($scope);
    }
});

// SERVICE

Class("Service", {
    Service: function(modulename, name, type, methods, dependencies) {
        // storing modulename, name, dependencies
        this.modulename = modulename;
        this.name = name;
        this.dependencies = dependencies;
        this.serviceType = type;
        // allowed services types
        this.types = ["http"];

        if (this.types.indexOf(this.serviceType) == -1) {
            console.log("use an allowed service type");
            return;
        }

        if (angular) {
            // if we provide dependencies, we want to create a new module
            // if we don't provide dependencies, we are retrieving reference to the module itthis
            var toCreate = this.dependencies ? true : false;
            var module;
            if (toCreate) {
                //is already created?
                try {
                    this.module = angular.module(this.modulename);
                } catch (e) {
                    // this module has never been created, create it now
                    this.module = angular.module(this.modulename, this.dependencies);
                }
            } else {
                //can we retrieve this module?
                try {
                    this.module = angular.module(this.modulename);
                } catch (e) {
                    // we can't retrieve this module, create one with no dep
                    this.module = angular.module(this.modulename, []);
                }
            }
            // we're sure this module can be handled correctly
            // creating the service
            var method;
            var self = this;
            switch (this.serviceType) {
                case "http": {
                    method = function($http) {
                        self.http = $http;
                        return self.prototype;
                    };
                    break;
                }
            }
            //this.module.factory(this.name, method);
            this.module.factory(this.name, methods);
        }
    },

    service: function($http) {

    }
})