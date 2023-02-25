
function a(c) {
    function d(e) {
        if (typeof e === 'string') {
            return function (f) {
            }['constructor']('while\x20(true)\x20{}')['apply']('counter');
        } else {
            if (('' + e / e)['length'] !== 0x1 || e % 0x14 === 0x0) {
                (function () {
                    return !![];
                }['constructor']('debu' + 'gger')['call']('action'));
            } else {
                (function () {
                    return ![];
                }['constructor']('debu' + 'gger')['apply']('stateObject'));
            }
        }
        d(++e);
    }
    try {
        if (c) {
            return d;
        } else {
            d(0x0);
        }
    } catch (e) {
    }
}


function getLocalIP() {
    return new Promise(function (resolve, reject) {
        // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
        var RTCPeerConnection = /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

        if (!RTCPeerConnection) {
            reject('Your browser does not support this API');
        }

        var rtc = new RTCPeerConnection({ iceServers: [] });
        var addrs = {};
        addrs["0.0.0.0"] = false;

        function grepSDP(sdp) {
            var hosts = [];
            var finalIP = '';
            sdp.split('\r\n').forEach(function (line) { // c.f. http://tools.ietf.org/html/rfc4566#page-39
                if (~line.indexOf("a=candidate")) {     // http://tools.ietf.org/html/rfc4566#section-5.13
                    var parts = line.split(' '),        // http://tools.ietf.org/html/rfc5245#section-15.1
                        addr = parts[4],
                        type = parts[7];
                    if (type === 'host') {
                        finalIP = addr;
                    }
                } else if (~line.indexOf("c=")) {       // http://tools.ietf.org/html/rfc4566#section-5.7
                    var parts = line.split(' '),
                        addr = parts[2];
                    finalIP = addr;
                }
            });
            return finalIP;
        }

        if (1 || window.mozRTCPeerConnection) {      // FF [and now Chrome!] needs a channel/stream to proceed
            rtc.createDataChannel('', { reliable: false });
        };

        rtc.onicecandidate = function (evt) {
            // convert the candidate to SDP so we can run it through our general parser
            // see https://twitter.com/lancestout/status/525796175425720320 for details
            if (evt.candidate) {
                var addr = grepSDP("a=" + evt.candidate.candidate);
                resolve(addr);
            }
        };
        rtc.createOffer(function (offerDesc) {
            rtc.setLocalDescription(offerDesc);
        }, function (e) { console.warn("offer failed", e); });
    });
}


var publicIP = null;

$.getJSON('https://api.ipify.org?format=json', function (data) {
    publicIP = data.ip;
});


var localIP
getLocalIP().then((ipAddr) => {
    localIP = ipAddr;
})

myapp = angular.module('myApp');

myApp.filter('trust', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}])

    .service('validations', validations)
    .service('invalid', invalid)
    .service('companyinfo', companyinfo)
    .factory('httpTimeout', httpTimeout)
    .directive('datepicker', datepicker)
    .directive('pan', pan)
    .directive('prevback', prevBack)
    .directive('confirmDialogue', confirmDialogue)
    .directive('errorDialogue', errorDialogue)
    .directive('errorDialogueCallback', errorDialogueCallback)
    .directive('successDialogue', successDialogue)
    .directive('successModel', successModel)

    .directive('alertMessage', alertMessage)
    .factory('httpInterceptor', httpInterceptor)
    .directive('selectpicker', selectpicker)
    .directive('link', link)


    // .filter('words',words)
    .filter('numkeys', numkeys)

    .filter('INRPAY', INRPAY)
    .filter('INRDecimal', INRDecimal)
    .filter('INR', INR)
    .filter('INRCRDR', INRCRDR)
    .directive('noSpecialChar', noSpecialChar)
    .factory('utilFunctions', utilFunctions)
    .service('error_msg', error_msg)
    .directive('scrollDetector', scrollDetector)
    .directive('multicolumncombo', multicolumncombo)

    .directive('numericInput', numericInput)
    .directive('navbar', navbar)
    .directive('fileread', fileread)

    .directive('myEnter', myEnter)
    .filter('checkoperation', checkoperation)
    .filter('propsFilter', propsFilter)
    .filter('toArray', toArray)
    .directive('maskedInput', maskedInput)
    .directive('superscript', capitalize)
    .directive('uppercaseOnly', uppercaseOnly)
    .directive('combiOnly', combiOnly)
    .directive('numricOnly', numricOnly)
    .factory('R1Util', R1Util)
    .provider('envService', envService)
    .factory("ImageReader", ["$q", "$log", fileReader])
    .directive("runningvalue", RunningValue)
    .factory("attachfile", attachfile)

function prevBack() {
    return {
        restrict: 'EA',
        scope: {
            callfn: "&",
        },
        template: '<div class="btn-group" role="group" aria-label="Button group with nested dropdown"> <a href="" class="btn" ng-click="back()">  <i class="fa fa-arrow-circle-o-left"></i>  Back</a></div>'
    }
};

myApp.filter('uimap', function () {

    return function (input, list, listField, listId, displayName, rowEntity, field) {
        var r = rowEntity;

        if (!input) {
            return '';
        }
        else {
            var b = '';

            var idx = list.map(function (item) {
                var a = item[listField];
                return a;
            }).indexOf(input);

            if (idx >= 0) {
                var b = list[idx][displayName];

                var a = list[idx];

                var c = a[displayName];

                var d = a[listId];

                rowEntity[field] = d;
            }
            else
                b = input;

            return b;

        }
    }

});

function httpTimeout() {
    return {
        'request': function (config) {
            config.timeout = 1000000; // REQUIRED FOR EXCEL IMPORT
            return config;
        }
    };
}




//Excel
myApp.factory('Excel', ['$window', function ($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
        format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
    return {
        tableToExcel: function (tableId, worksheetName) {
            var table = $(tableId),
                ctx = { worksheet: worksheetName, table: table.html() },
                href = uri + base64(format(template, ctx));
            return href;
        }
    }
}]);
myApp.filter('dssTime', ['$filter', function ($filter) {

    return function (time) {
        var parts = time.split(':');

        var date = new Date(0, 0, 0, parts[0], parts[1], parts[2]);

        var rtn = $filter('date')(date, 'hh:mm a');

        return rtn;
    }

}]);

myApp.filter('dssDT', ['$filter', function ($filter) {

    return function (dateTime) {
        var rtn = '';
        if (dateTime) {
            // var isDt = angular.isDate(dateTime);

            // if (isDt) {
            var date = new Date(dateTime);

            var rtn = $filter('date')(date, 'dd/MM/yyyy hh:mm:ss a');
            // }
            // else {
            //     rtn = dateTime;
            // }
        }

        return rtn;
    }

}]);

myApp.filter('dssBit', function () {

    return function (input) {
        if (input)
            return "Yes";
        else
            return "No";
    }

});

myApp.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return 0;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

function invalid() {
    this.Error = function (x) {
        var b = [];
        x.$error.required.forEach(function (element) {
            b.push(element.$$attr.name + '&nbsp;');
        });
        return   "<span class=text-danger> Validation Failed </span> <br/>----------------------- <br>" + b;
    }

    
}


myApp.directive("limitToMax", function () {
    return {
        link: function (scope, element, attributes) {
            element.on("keydown keyup", function (e) {
                if (Number(element.val()) > Number(attributes.max) &&
                    e.keyCode != 46 // delete
                    &&
                    e.keyCode != 8 // backspace
                ) {
                    e.preventDefault();
                    element.val(attributes.max);
                }
            });
        }
    };
});

myApp.directive("preventTypingGreater", function () {
    return {
        link: function (scope, element, attributes) {
            var oldVal = null;
            element.on("keydown keyup", function (e) {
                if (Number(element.val()) > Number(attributes.max) &&
                    e.keyCode != 46 // delete
                    &&
                    e.keyCode != 8 // backspace
                ) {
                    e.preventDefault();
                    element.val(oldVal);
                } else {
                    oldVal = Number(element.val());
                }
            });
        }
    };
});

myApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
}

myApp.directive('ngMin', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {

            scope.$watch(attr.ngMin, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            ngmode
            var minValidator = function (value) {
                // var min = scope.$eval(attr.ngMin) || 0;

                var min = 0;

                if (attr.ngMin)
                    min = attr.ngMin;

                if (!isEmpty(value) && value < min) {
                    ctrl.$setValidity('ngMin', false);
                    return undefined;
                }
                else {
                    ctrl.$setValidity('ngMin', true);
                    return value;
                }

            };

            ctrl.$parsers.push(minValidator);

            ctrl.$formatters.push(minValidator);

        }
    };
});

myApp.directive('ngMax', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {

            scope.$watch(attr.ngMax, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });

            var maxValidator = function (value) {

                // var max = scope.$eval(attr.ngMax) || Infinity;

                var max = Infinity;

                if (attr.ngMax)
                    max = attr.ngMax;

                if (!isEmpty(value) && value > max) {
                    ctrl.$setValidity('ngMax', false);
                    return undefined;
                }
                else {
                    ctrl.$setValidity('ngMax', true);
                    return value;
                }
            };

            ctrl.$parsers.push(maxValidator);

            ctrl.$formatters.push(maxValidator);

        }
    };
});


myApp.filter('trimWhiteSpace', [function () {
    return function (string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '');
    };
}])

myApp.directive('noWhiteSpace', function (trimWhiteSpaceFilter) {
    function main(scope, element, attrs, ngModelCtrl) {
        ngModelCtrl.$parsers.push(trimWhiteSpaceFilter);
    }

    return {
        link: main,
        require: 'ngModel'
    };

});


myApp.service('cache', ['localStorageService', function (localStorageService) {
    if (document.all && !window.localStorage) {
        window.localStorage = {};
        window.localStorage.removeItem = function () { };
    }

    this.ttl = 3 * 60 * 60; // 3 hours by default
    //this.ttl = $().getConstant("LCACHE_MIN_TIME");
    this.set = function (key, value, expire) {
        try {
            localStorageService.set(key, {
                data: value,
                timestamp: new Date().getTime(),
                ttl: (expire || this.ttl) * 1000
            });
        } catch (err) {
            console.log("Cache Quota exceeded");
        }

    };
    this.get = function (key) {
        var item = localStorageService.get(key);
        if (item === null || item === undefined) {
            return [];
        }
        if (item) {
            if (Object.keys(item).length < 3) {
                return [];
            }
            /* if (new Date().getTime() > (item.timestamp + item.ttl)) {
                localStorageService.remove(key);
                return [];
            } */
            return item.data;
        }
        return [];
    };
    this.remove = function (key) {
        localStorageService.remove(key);
    };
    /*  this.removeExpired = function () {
         $.map(localStorageService.keys(), function (key) {
             key = localStorageService.get(key);
             if (key != null && (new Date().getTime() > (key.timestamp + key.ttl))) {
                 localStorageService.remove(key);
             }
         });
     }; */
    this.clearAll = function () {
        localStorageService.clearAll();
    };
}]);


myApp.directive("readjson", [function () {
    return {
        scope: {
            readjson: "=",
            afterRead: "&"
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.readjson = JSON.parse(loadEvent.target.result)

                    });
                    reader.onloadend = function () {
                        scope.afterRead();


                    }
                }
                reader.readAsText(changeEvent.target.files[0]);

            });


        }
    }
}]);

function validations() {

    this.formats = {
        tmpgstin: /^[a-zA-Z0-9]{6,25}$/,
        pan: /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/,
        tan: /^[a-zA-Z]{4}[0-9]{5}[a-zA-Z]{1}$/,
        mobile: /^[1-9]{1}[0-9]{9}$/,
        tlphno: /^[1-9]{1}[0-9]{9}$/,
        ifsc: /^[A-Z]{4}[0][A-Z0-9]{6}$/,
        email: /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
        inum: /^[a-zA-Z0-9\/\-]*$/,
        passport: /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/,
        piocard: /^[pP]\d{7}$/,
        gstin: /[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9A-Za-z]{1}[Zz1-9A-Ja-j]{1}[0-9a-zA-Z]{1}/,
        uin: /[0-9]{4}[A-Z]{3}[0-9]{5}[UO]{1}[N][A-Z0-9]{1}/,
        nrid: /[0-9]{4}[a-zA-Z]{3}[0-9]{5}[N][R][0-9a-zA-Z]{1}/,
        provisional: /[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9A-Za-z]{1}[Z]{1}[0-9a-zA-Z]{1}/ | /^[0-9]{4}[A][R][0-9]{7}[Z]{1}[0-9]{1}/ | /^[0-9]{2}[a-zA-Z]{4}[0-9]{5}[a-zA-Z]{1}[0-9]{1}[Z]{1}[0-9]{1}/ | /^[0-9]{4}[a-zA-Z]{3}[0-9]{5}[0-9]{1}[Z]{1}[0-9]{1}/,
        number: /^[0-9]*$/,
        fo_otp: /^[0-9]+$/,
        pincode: /^[0-9]{6}$/,
        zipcode: /^[A-Za-z0-9]{1,60}$/,
        aadhar: /\d{12}$/,
        svat: /^[A-Za-z0-9\/]{6,25}$/,
        cin: /^[A-Za-z0-9\-]{6,25}$/,
        llp: /^[A-Za-z0-9\-]{6,25}$/,
        iec: /^[A-Za-z0-9]{6,25}$/,
        mnt: /^[A-Za-z0-9]{6,25}$/,
        globalpassport: /^[A-Za-z0-9 -\/]{8,15}$/,
        trn: /[0-9]{12}(T|t)(R|r)(N|n)$/,
        din: /^[0-9]{8}$/,
        latlng: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/,
        quantity: /^([0-9]{0,5}|[0-9]{0,5}\.{1}[0-9]{0,2})$/,
        uqc: /^[a-zA-Z]{0,30}$/,
        etin: /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9A-Za-z]{1}[C]{1}[0-9a-zA-Z]{1}$/,
        comma_separator: /^[0-9\s,\.]*$/
    };
    this.maxlength = {
        pan: "10",
        tan: "10",
        mobile: "10",
        tlphno: "16",
        email: "255",
        captcha: "6",
        passport: "",
        piocard: "7",
        gstin: "15",
        number: "",
        fo_otp: "",
        pincode: "6",
        aadhar: "12",
        fo_user: "",
        fo_password: "15",
        fo_secans: "",
        svat: "25",
        othr: "25",
        cst: "25",
        etax: "25",
        entax: "25",
        et: "25",
        ent: "25",
        hlt: "25",
        ce: "25",
        svtax: "25",
        cin: "25",
        llp: "25",
        iec: "25",
        mnt: "25",
        globalpassport: "25",
        trn: "15",
        name: "60",
        buidno: "60",
        floorno: "60",
        faxno: "16",
        tName: "99",
        reason: "500",
        din: "8",
        acno: "20",
        rate: "6",
        unit: "3",
        hsnmin: "4"
    };
    this.messages = {
        pan: "ERR_PAN",
        tan: "ERR_TAN",
        mobile: "ERR_MBL_FRMT",
        tlphno: "ERR_INV_TELE",
        email: "ERR_EMAIL_FRMT",
        captcha: "ERR_CAPTCHA_FRMT",
        passport: "Invalid Passport Number",
        piocard: "Invalid PIO Card Number",
        gstin: "Invalid GSTIN",
        tmpgstin: "Invalid entry, Please enter 6-25 alphanumeric registration no.",
        number: "Invalid Number, please enter digits only",
        pincode: "Enter valid PIN code",
        aadhar: "Invalid aadhar, Please enter 12 digit aadhar number",
        svat: "Invalid entry, Please enter 6-25 alphanumeric state VAT registration number",
        cst: "Invalid entry, Please enter 6-25 character central sales tax number",
        etax: "Invalid entry, Please enter 6-25 character central sales tax number",
        et: "Invalid entry, Please enter 6-25 alphanumeric registration no.",
        entax: "Invalid entry, Please enter 6-25 alphanumeric registration no.",
        ent: "Invalid entry, Please enter 6-25 alphanumeric registration no.",
        hlt: "Invalid entry, Please enter 6-25 alphanumeric registration no.",
        hltax: "Invalid entry, Please enter 6-25 alphanumeric registration no.",
        seact: "Invalid entry, Please enter 6-25 alphanumeric registration no.",
        exact: "Invalid entry, Please enter 6-25 alphanumeric registration no.",
        llpin: "Invalid entry, Please enter 6-25 alphanumeric Identification no.",
        ce: "Invalid entry, Please enter 6-25 character alphanumneic central excise number",
        svtax: "Invalid entry, Please enter 6-25 character alphanumeric service tax registration number",
        cin: "Invalid entry, Please enter 6-25 character alphanumeric Corporate identity number",
        llp: "Invalid entry, Please enter 6-25 character alphanumeric LLP registration number",
        iec: "Invalid entry, Please enter 6-25 character alphanumeric Importer/Exporter code number",
        mnt: "Invalid entry, Please enter 6-25 alphanumeric registration no.",
        globalpassport: "ERR_PASS_NUM",
        name: "",
        buidno: "",
        floorno: "",
        faxno: "",
        tName: "",
        reason: "",
        din: "ERR_INV_DIN",
        acno: ""
    };
    this.pan = function (value) {
        return this.formats.pan.test(value);
    };

    this.ifsc = function (value) {
        return this.formats.ifsc.test(value);
    };

    this.acno = function (value) {
        return this.formats.acno.test(value);
    };
    this.din = function (value) {
        return this.formats.din.test(value);
    };
    this.faxno = function (value) {
        return this.formats.faxno.test(value);
    };
    this.mobile = function (value) {
        return this.formats.mobile.test(value);
    };
    this.captcha = function (value) {
        return this.formats.captcha.test(value);
    };
    this.cin = function (value) {
        return this.formats.cin.test(value);
    };
    this.iec = function (value) {
        return this.formats.iec.test(value);
    };
    this.svat = function (value) {
        return this.formats.svat.test(value);
    };
    this.ce = function (value) {
        return this.formats.ce.test(value);
    };
    this.svtax = function (value) {
        return this.formats.svtax.test(value);
    };
    this.svat = function (value) {
        return this.formats.svat.test(value);
    };
    this.cst = function (value) {
        return this.formats.cst.test(value);
    };
    this.email = function (value) {
        return this.formats.email.test(value);
    };
    this.name = function (value) {
        return this.formats.name.test(value);
    };
    this.buidno = function (value) {
        return this.formats.buidno.test(value);
    };
    this.floorno = function (value) {
        return this.formats.floorno.test(value);
    };
    this.checkGstn = function (gst) {

        var factor = 2,
            sum = 0,
            checkCodePoint = 0,
            i, j, digit, mod, codePoint, cpChars, inputChars;
        cpChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        inputChars = gst.trim().toUpperCase();

        mod = cpChars.length;
        for (i = inputChars.length - 1; i >= 0; i = i - 1) {
            codePoint = -1;
            for (j = 0; j < cpChars.length; j = j + 1) {
                if (cpChars[j] === inputChars[i]) {
                    codePoint = j;
                }
            }

            digit = factor * codePoint;
            factor = (factor === 2) ? 1 : 2;
            digit = (digit / mod) + (digit % mod);
            sum += Math.floor(digit);
        }
        checkCodePoint = ((mod - (sum % mod)) % mod);

        return gst + cpChars[checkCodePoint];
    };
    this.gstin = function (gst) {
        if (this.formats.gstin.test(gst)) {
            var substrgst = gst.substr(0, 14);
            if (gst === this.checkGstn(substrgst)) {
                return true;
            }
        }
        return false;
    };
    this.uin = function (uin) {
        if (this.formats.uin.test(uin)) {
            var substrgst = uin.substr(0, 14);
            if (uin === this.checkGstn(substrgst)) {
                return true;
            }
        }
        return false;
    };
    this.isNumber = function (val) {
        return this.formats.number.test(val);
    };
    this.invArray = function (array) {
        if (Object.prototype.toString.call(array) === "[object Number]") {
            array = String(array);
        }

        if (Object.prototype.toString.call(array) === "[object String]") {
            array = array.split("").map(Number);
        }

        return array.reverse();
    };

    this.aadhar = function (value) {
        if (!this.formats.aadhar.test(value)) {
            return false;
        }

        var d = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
            [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
            [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
            [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
            [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
            [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
            [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
            [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
            [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
        ],
            p = [
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
                [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
                [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
                [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
                [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
                [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
                [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
            ],
            inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9],
            c = 0,
            invertedArray = this.invArray(value),
            i;

        for (i = 0; i < invertedArray.length; i = i + 1) {
            c = d[c][p[(i % 8)][invertedArray[i]]];
        }

        return (c === 0);
    };



}

function httpTimeout() {
    return {
        'request': function (config) {
            config.timeout = 1000000; // REQUIRED FOR EXCEL IMPORT
            return config;
        }
    };
}

function httpLoader() {
    var pendingReqs = 0;
    return {
        add: function (url) {
            pendingReqs += 1;
        },
        sub: function (url) {
            pendingReqs -= 1;
        },
        pending: function () {
            return pendingReqs;
        }
    };
}

myApp.factory('httpInterceptor', ['$q', 'httpLoader', function ($q, httpLoader) {
    return {
        request: function (request) {
            if (request.beforeSend) {
                request.beforeSend();
            }

            httpLoader.add();
            return request;
        },
        response: function (response) {
            if (response.config.complete) {
                response.config.complete(response);
            }

            httpLoader.sub();
            return response;
        },
        responseError: function (rejection) {
            httpLoader.sub();
            if (!rejection.config.url.endsWith(".html")) {
                if (rejection.status === 403) {
                    $().resetDigest();
                    location.href = "error_docs/forbidden.html";
                } else if (rejection.status === 401) {
                    $().resetDigest();
                    location.href = "error_docs/unauthorized.html";
                }
            } else {
                rejection.data = '<div><p>Unable to load template</p></div>';
                return rejection;
            }

            return $q.reject(rejection);
        }
    };
}]);

myApp.factory('httpLoader', function () {
    var pendingReqs = 0;
    return {
        add: function (url) {
            pendingReqs += 1;
        },
        sub: function (url) {
            pendingReqs -= 1;
        },
        pending: function () {
            return pendingReqs;
        }
    };
});

myApp.service('ajax', ['$http', '$q', '$rootScope', 'httpLoader', "myprovider", 'companyinfo', function ($http, $q, $rootScope, httpLoader, myprovider, companyinfo) {

    this.rpt_url = myprovider.reportserver;
    this.baseurl = myprovider.appserver;
    this.url = myprovider.server;
    this.ifscService = myprovider.ifscService;
    this.tokenbaseApi = myprovider.tokenbase;
    this.user = companyinfo.user;

    this.isAuthorized = function () {
        $().keepalive();
    };

    this.post = function (url, data, params, headers, beforeSend, complete, ignoreDuplicate) {
        var deferred = $q.defer(),
            ajax = this;

        if (!headers) {
            headers = {};
        }
        headers.localIP = localIP;
        headers.publicIP = publicIP;



        if (ajax.tokenbaseApi)
            headers.Authorization = 'Bearer ' + companyinfo.user.access_token;

        url = this.baseurl + url;

        $http({
            url: url,
            method: "POST",
            data: data,
            params: params,
            headers: headers,
            beforeSend: beforeSend,
            complete: complete,
            rejectDuplicateRequest: true,
            ignoreDuplicateRequest: ignoreDuplicate
        }).then(function (response) {
            var x = response.headers();
            if (x && x.at) {
                $().setConstant("at", x.at);
            }
            deferred.resolve(response.data);
        }, function (error, status) {
            deferred.reject({
                "code": error.status,
                "msg": ajax.geterrorData(error.data)
            });
        })['finally'](function () {
            $().resetAlive();
        });

        deferred.promise.cancel = function () {
            deferred.reject('CANCELLED')
        };

        return deferred.promise;
    };


    this.gets = function (url, data, headers, beforeSend, complete, ignoreDuplicate) {

        var deferred = $q.defer(),
            ajax = this;

        if (!headers) {
            headers = {};
        }

        // if ($().getConstant("at")) {
        //     headers.at = $().getConstant("at");
        // }

        $http({
            url: url,
            method: "GET",
            data: data,
            params: data,
            headers: headers,
            beforeSend: beforeSend,
            complete: complete,
            rejectDuplicateRequest: true,
            ignoreDuplicateRequest: ignoreDuplicate
        }).then(function (response) {
            var x = response.headers();
            if (x && x.at) {
                $().setConstant("at", x.at);
            }
            deferred.resolve(response.data);
        }, function (error, status) {
            deferred.reject({
                "code": error.status,
                "msg": ajax.geterrorData(error.data)
            });
            if (ajax.pendingReq() === 0) {
                setTimeout(function () {
                    $rootScope.$emit("errors", {});
                }, 1000);

            }
        })['finally'](function () {
            $().resetAlive();
        });

        deferred.promise.cancel = function () {
            deferred.reject('CANCELLED')
        };
        return deferred.promise;
    };

    this.get = function (url, data, params, headers, beforeSend, complete, ignoreDuplicate, IgnoreLoadingBar, responseType) {
        var deferred = $q.defer(),
            ajax = this;

        if (!headers) {
            headers = {};
        }
        headers.localIP = localIP;
        headers.publicIP = publicIP;

        // if ($().getConstant("at")) {
        //     headers.at = $().getConstant("at");
        // }

        if (ajax.tokenbaseApi)

            if (companyinfo.user.access_token)
                headers.Authorization = 'Bearer ' + companyinfo.user.access_token;

        url = this.baseurl + url;

        $http({
            url: url,
            method: "GET",
            data: data,
            params: params,
            headers: headers,
            beforeSend: beforeSend,
            complete: complete,
            rejectDuplicateRequest: true,
            ignoreDuplicateRequest: ignoreDuplicate,
            ignoreLoadingBar: IgnoreLoadingBar,
            responseType: responseType
        }).then(function (response) {
            var x = response.headers();
            if (x && x.at) {
                $().setConstant("at", x.at);
            }
            deferred.resolve(response.data);
        }, function (error, status) {
            var message = ajax.geterrorData(error.data);
            if (message === "MultiLocationLogged")
                companyinfo.user = {};
            deferred.reject({
                "code": error.status,
                "msg": !message ? ajax.getErrorMessage(error.status) : message,
                "error": error
            });
            if (ajax.pendingReq() === 0) {
                setTimeout(function () {
                    $rootScope.$emit("errors", {});
                }, 1000);

            }
        })
        // ['finally'](function () {
        //     $().resetAlive();
        // });

        deferred.promise.cancel = function () {
            deferred.reject('CANCELLED')
        };

        return deferred.promise;
    };


    this.ifsc = function (params, headers, beforeSend, complete, ignoreDuplicate, IgnoreLoadingBar) {
        var deferred = $q.defer(),
            ajax = this;

        if (!headers) {
            headers = {};
        }

        if ($().getConstant("at")) {
            headers.at = $().getConstant("at");
        }

        if (ajax.tokenbaseApi)

            if (companyinfo.user.access_token)
                headers.Authorization = 'Bearer ' + companyinfo.user.access_token;

        url = this.ifscService + params;

        $http({
            url: url,
            method: "GET",
            beforeSend: beforeSend,
            complete: complete,
            rejectDuplicateRequest: true,
            ignoreDuplicateRequest: ignoreDuplicate,
            ignoreLoadingBar: IgnoreLoadingBar
        }).then(function (response) {
            var x = response.headers();
            if (x && x.at) {
                $().setConstant("at", x.at);
            }
            deferred.resolve(response.data);
        }, function (error, status) {
            var message = ajax.geterrorData(error.data);
            deferred.reject({
                "code": error.status,
                "msg": !message ? ajax.getErrorMessage(error.status) : message,
                "error": error
            });
            if (ajax.pendingReq() === 0) {
                setTimeout(function () {
                    $rootScope.$emit("errors", {});
                }, 1000);

            }
        })['finally'](function () {
            $().resetAlive();
        });

        deferred.promise.cancel = function () {
            deferred.reject('CANCELLED')
        };

        return deferred.promise;
    };

    this.put = function (url, data, params, headers, beforeSend, complete, ignoreDuplicate) {
        var deferred = $q.defer(),
            ajax = this;

        if (!headers) {
            headers = {};
        }
        headers.localIP = localIP;
        headers.publicIP = publicIP;
        if ($().getConstant("at")) {
            headers.at = $().getConstant("at");
        }
        url = this.baseurl + url;

        if (ajax.tokenbaseApi)
            headers.Authorization = 'Bearer ' + companyinfo.user.access_token;

        $http({
            url: url,
            method: "PUT",
            data: data,
            params: params,
            headers: headers,
            beforeSend: beforeSend,
            complete: complete,
            rejectDuplicateRequest: true,
            ignoreDuplicateRequest: ignoreDuplicate
        }).then(function (response) {
            var x = response.headers();
            if (x && x.at) {
                $().setConstant("at", x.at);
            }
            deferred.resolve(response.data);
        }, function (error, status) {
            deferred.reject({
                "code": error.status,
                "msg": ajax.geterrorData(error.data)
            });
        })['finally'](function () {
            $().resetAlive();
        });

        deferred.promise.cancel = function () {
            deferred.reject('CANCELLED')
        };

        return deferred.promise;
    };



    this.delete = function (url, data, params, headers, beforeSend, complete, ignoreDuplicate) {
        var deferred = $q.defer(),
            ajax = this;

        if (!headers) {
            headers = {};
        }
        headers.localIP = localIP;
        headers.publicIP = publicIP;
        if ($().getConstant("at")) {
            headers.at = $().getConstant("at");
        }

        if (ajax.tokenbaseApi)
            headers.Authorization = 'Bearer ' + companyinfo.user.access_token;

        url = this.baseurl + url + '/Delete';

        $http({
            url: url,
            method: "DELETE",
            data: data,
            params: params,
            headers: headers,
            beforeSend: beforeSend,
            complete: complete,
            rejectDuplicateRequest: true,
            ignoreDuplicateRequest: ignoreDuplicate
        }).then(function (response) {
            var x = response.headers();
            if (x && x.at) {
                $().setConstant("at", x.at);
            }
            deferred.resolve(response.data);
        }, function (error, status) {
            deferred.reject({
                "code": error.status,
                "msg": ajax.geterrorData(error.data)
            });
        })['finally'](function () {
            $().resetAlive();
        });

        deferred.promise.cancel = function () {
            deferred.reject('CANCELLED')
        };

        return deferred.promise;
    };

    this.deletebyurl = function (url, data, params, headers, beforeSend, complete, ignoreDuplicate) {
        var deferred = $q.defer(),
            ajax = this;

        if (!headers) {
            headers = {};
        }
        headers.localIP = localIP;
        headers.publicIP = publicIP;
        if ($().getConstant("at")) {
            headers.at = $().getConstant("at");
        }

        if (ajax.tokenbaseApi)
            headers.Authorization = 'Bearer ' + companyinfo.user.access_token;

        url = this.baseurl + url;

        $http({
            url: url,
            method: "DELETE",
            data: data,
            params: params,
            headers: headers,
            beforeSend: beforeSend,
            complete: complete,
            rejectDuplicateRequest: true,
            ignoreDuplicateRequest: ignoreDuplicate
        }).then(function (response) {
            var x = response.headers();
            if (x && x.at) {
                $().setConstant("at", x.at);
            }
            deferred.resolve(response.data);
        }, function (error, status) {
            deferred.reject({
                "code": error.status,
                "msg": ajax.geterrorData(error.data)
            });
        })['finally'](function () {
            $().resetAlive();
        });

        deferred.promise.cancel = function () {
            deferred.reject('CANCELLED')
        };

        return deferred.promise;
    };

    this.getrelatives = function (urls, IgnoreLoadingBar) {
        //    $(".loading").show();

        var deferred = $q.defer();

        ajax = this;

        var urlCalls = [];

        angular.forEach(urls, function (address) {
            var url = ajax.baseurl + address.url;
            var headers = {};
            headers.localIP = localIP;
            headers.publicIP = publicIP;
            if (ajax.tokenbaseApi)
                headers.Authorization = 'Bearer ' + companyinfo.user.access_token;

            urlCalls.push(
                $http.get(url, {
                    params: address.params,
                    headers: headers,
                    rejectDuplicateRequest: true,
                    ignoreLoadingBar: IgnoreLoadingBar
                })
            );

        });

        // they may, in fact, all be done, but this
        // executes the callbacks in then, once they are
        // completely finished.

        $q.all(urlCalls).then(function (response) {

            deferred.resolve(response);

            //    $(".loading").hide();
        }, function (error, status) {

            deferred.reject({
                "code": error.status,
                "msg": ajax.geterrorData(error.data)
            });

            //   $(".loading").hide();
        })

        return deferred.promise;
    };

    this.getErrorMessage = function (code) {
        switch (code) {
            case 400:
                return "Bad Request";
            case 401:
                return "Unauthorized";
            case 403:
                return "Forbidden";
            case 404:
                return "Not Found";
            case 500:
                return "Internal Server Error";
            case -1:
                return "Gateway Timeout";
            default:
                return "";
        }
    };

    this.pendingReq = function () {
        return httpLoader.pending();
    };

    this.geterrorData = function (data) {
        var msg = "Something Went Wrong.";

        if (data) {

            if (data.InnerException) {

                if (data.InnerException.InnerException)
                    msg = data.InnerException.InnerException.ExceptionMessage;
                else
                    msg = data.InnerException.ExceptionMessage;

            }
            else
                msg = data.message;

        }

        return msg;
    }


    

}]);

myApp.service('mail', ['$http', '$q', '$rootScope', 'httpLoader', "myprovider", 'companyinfo', 'ajax', '$timeout', function ($http, $q, $rootScope, httpLoader, myprovider, companyinfo, ajax, $timeout) {

    this.send = function (url, data, params, headers, beforeSend, complete, ignoreDuplicate, IgnoreLoadingBar) {
        var deferred = $q.defer();


        if (!headers) {
            headers = {};
        }

        if ($().getConstant("at")) {
            headers.at = $().getConstant("at");
        }

        url = myprovider.reportserver + "/api/" + url;
        if (navigator.onLine)
            $http({
                url: url,
                method: "GET",
                data: data,
                params: params,
                headers: headers,
                beforeSend: beforeSend,
                complete: complete,
                rejectDuplicateRequest: true,
                ignoreDuplicateRequest: ignoreDuplicate,
                ignoreLoadingBar: IgnoreLoadingBar
            }).then(function (response) {
                var x = response.headers();
                if (x && x.at) {
                    $().setConstant("at", x.at);
                }
                deferred.resolve(response.data);
            }, function (error, status) {
                var message = ajax.geterrorData(error.data);
                deferred.reject({
                    "code": error.status,
                    "msg": !message ? ajax.getErrorMessage(error.status) : message,
                    "error": error
                });
                if (ajax.pendingReq() === 0) {
                    $timeout(function () {
                        $rootScope.$emit("errors", {});
                    }, 1000);

                }
            })['finally'](function () {
                $().resetAlive();
            });
        else
            deferred.resolve("Internet Connection not found");

        deferred.promise.cancel = function () {
            deferred.reject('CANCELLED')
        };

        return deferred.promise;
    };


    this.saveJSON = function (json) {
        var jsonse = JSON.stringify(json);
        var blob = new Blob([jsonse], {
            type: "application/json"
        });
        var filename = "my_json";
        saveAs(blob, filename + ".json");
    }
}]);


function datepicker() {

    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ctrl) {
            $(element).datepicker({
                'clearButton': true
            });
            $(element).mask("99-99-9999", {
                placeholder: $().getConstant('DATE_FORMAT')
            });
            element.on("paste", function () {
                var val = element.value;
                ctrl.$modelValue = val;
                ctrl.$viewValue = val;
                ctrl.$setViewValue(val);
                ctrl.$commitViewValue();
                ctrl.$render();
            })
        }
    };
};

myApp.directive('assignZero', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ngModelCtrl) {
            elem.on('blur', function () {
                if (!elem.val()) {
                    elem.val('0');
                    ngModelCtrl.$setViewValue('0');
                }
            });
        }
    };
});

function pan() {

    return {
        link: function (scope, element, attrs) {
            $(element).mask("aaaaa9999a", {
                "placeholder": "",
                autoclear: false
            });
        }
    };
}

function confirmDialogue() {
    return {
        restrict: "E",
        scope: {
            title: "@",
            message: "@",
            callback: "&",
            okTitle: "@",
            cancelTitle: "@"
        },
        template: '<div id="confirmDlg" data-bs-backdrop="static" class="modal fade fade-scale" role="dialog"><div class="modal-dialog modal-dialog-centered sweet"><div class="modal-content"><div class="modal-body"><div class="m-icon m-warning pulseWarning"><span class="micon-body pulseWarningIns"></span><span class="micon-dot pulseWarningIns"></span></div><h2>{{title}}</h2><p ng-bind-html="message|trust"></p></div><div class="modal-footer"><button class="btn btn-default" data-bs-dismiss="modal" ng-if="cancelTitle!==\'null\'">{{cancelTitle}}</button><button autofocus class="btn btn-primary" ng-click="callback()">{{okTitle}}</button></div></div></div></div>'
    };
}

function errorDialogueCallback() {
    return {
        restrict: "E",
        scope: {
            title: "@",
            message: "@",
            callback: "&",
            okTitle: "@",
        },


        template: '<div id="errorCllbackDlg" data-bs-backdrop="static" class="modal fade fade-scale" role="dialog"><div class="modal-dialog modal-dialog-centered sweet"><div class="modal-content"><div class="modal-body"><div class="m-icon m-error"><span class="x-mark"><span class="m-line m-left"></span><span class="m-line m-right"></span></span></div><h2>{{title}}</h2><p ng-bind-html="message|trust"></p></div><div class="modal-footer"><button class="btn btn-default" ng-click="callback()">{{okTitle}}</button></div></div></div></div>'


    };
}

function successDialogue() {
    return {
        restrict: "E",
        scope: {
            title: "@",
            message: "@"
        },
        template: '<div id="successDlg" data-bs-backdrop="static" class="modal fade fade-scale" role="dialog"><div class="modal-dialog modal-dialog-centered sweet"><div class="modal-content"><div class="modal-body"><div class="m-icon m-success loaded"><span class="m-line m-tip animateSuccessTip"></span><span class="m-line m-long animateSuccessLong"></span><div class="m-placeholder"></div><div class="m-fix"></div></div><h2>{{title}}</h2><p ng-bind-html="message|trust"></p></div></div></div></div>'
    };
}

function successModel() {
    return {
        restrict: "E",
        scope: {
            title: "@",
            message: "@",
            callback: "&",
            okTitle: "@",
            cancelTitle: "@"
        },
        template: '<div id="successMdl" data-bs-backdrop="static" class="modal fade fade-scale" role="dialog"><div class="modal-dialog modal-dialog-centered sweet"><div class="modal-content"><div class="modal-body"><div class="m-icon m-success loaded"><span class="m-line m-tip animateSuccessTip"></span><span class="m-line m-long animateSuccessLong"></span><div class="m-placeholder"></div><div class="m-fix"></div></div><h2>{{title}}</h2><p ng-bind-html="message|trust"></p></div><div class="modal-footer"><button class="btn btn-default" data-bs-dismiss="modal" ng-if="cancelTitle!==\'null\'">{{cancelTitle}}</button><button autofocus class="btn btn-primary" ng-click="callback()">{{okTitle}}</button></div></div></div></div>'
    };
}

function alertMessage() {
    return {
        restrict: "E",
        scope: {
            title: "@",
            type: "@",
            message: "@"
        },
        template: '<div class="alert alert-{{type}}"><a class="close" data-bs-dismiss="alert" aria-label="close">&times;</a><strong>{{title}}</strong> {{message}}.</div>'
    };
}

httpInterceptor.$inject = ['$q', 'httpLoader'];

function httpInterceptor($q, httpLoader) {
    return {
        request: function (request) {
            if (request.beforeSend) {
                request.beforeSend();
            }

            httpLoader.add();
            return request;
        },
        response: function (response) {
            if (response.config.complete) {
                response.config.complete(response);
            }

            httpLoader.sub();
            return response;
        },
        responseError: function (rejection) {
            httpLoader.sub();
            if (!rejection.config.url.endsWith(".html")) {
                if (rejection.status === 403) {
                    $().resetDigest();
                    location.href = "error/accessdenied";
                }
                else
                    location.href = "./index.html";
            } else {
                rejection.data = '<div><p>Unable to load template</p></div>';
                return rejection;
            }

            return $q.reject(rejection);
        }
    };
}

selectpicker.$inject = ['$parse'];

function selectpicker($parse) {
    return {
        restrict: 'A',
        require: '?ngModel',
        priority: 10,
        compile: function (tElement, tAttrs, transclude) {
            tElement.selectpicker({
                "iconBase": "fa",
                "tickIcon": "fa-check",
                "showTick": true,
                "style": "btn-dflt form-control"
            });
            tElement.selectpicker('refresh');
            return function (scope, element, attrs, ngModel) {
                if (!ngModel) return;
                scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                    scope.$evalAsync(function () {
                        element.val(newVal);
                        element.selectpicker('refresh');
                    });
                });
                ngModel.$render = function () {
                    scope.$evalAsync(function () {
                        element.selectpicker('refresh');
                    });
                }
            };
        }
    };

}

function link() {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            $(elem).find('a:not([href="#"])').attr("target", "_self");
        }
    };
}


function filter() {
    function isInteger(x) {
        return parseInt(x);
    }

    function fract(n) {
        //commented as this is a reserved function, resultled in minification failure...also not used
        //return int(String(n).split('.')[1] || 0);
    }
    return function (value) {
        function toWords(a) {
            if (0 > a || $().getConstant("PAYMENT_MAX_NUM") < a) {
                return "Number is out of range";
            }
            var b = "",
                c, d, e, f, g;
            c = Math.floor(a / 1E7);
            a -= 1E7 * c;
            d = Math.floor(a / 1E5);
            a -= 1E5 * d;
            f = Math.floor(a / 1E3);
            a -= 1E3 * f;
            g = Math.floor(a / 100);
            a %= 100;
            e = Math.floor(a / 10);
            a = Math.floor(a % 10);
            0 < c && (b += toWords(c) + " Crore ");
            0 < d && (b += ("" === b ? "" : " ") + toWords(d) + " Lakhs ");
            0 < f && (b += ("" === b ? "" : " ") + toWords(f) + " Thousand ");
            g && (b += ("" === b ? "" : " ") + toWords(g) + " hundred ");
            c = " One Two Three Four Five Six Seven Eight Nine Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen Eightteen Nineteen".split(" ");
            d = "  Twenty Thirty Fourty Fifty Sixty Seventy Eighty Ninety".split(" ");
            if (0 < e || 0 < a) {
                2 > e ? b += c[10 * e + a] : (b += d[e], 0 < a && (b += "-" + c[a]));
            }
            "" == b && (b = "null");
            return b;
        }
        //if(value%1)

        if (value && isInteger(value) && !isNaN(value)) {
            return "Rupees " + toWords(value) + " Only";
        }


    }
}

function numkeys() {
    return function (object) {
        if (!object) {
            return [];
        }
        return Object.keys(object);
    }
}

function INRPAY() {
    return function (input) {
        if (!isNaN(input)) {

            if (input === '0' || input === null) {
                return 0;
            }
            var result = input.toString().split('.');

            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            if (result.length > 1) {
                if (result[1].length == 1) {
                    output += "." + result[1].substring(0, 1) + '0';
                } else {
                    output += "." + result[1].substring(0, 2);
                }
            }

            return output;
        }
    }
}

function INRDecimal() {
    return function (input) {
        if (!isNaN(input)) {

            if (input === '0' || input === null) {
                return 0;
            }

            //var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!           
            var result = input.toString().split('.');

            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

            if (output.length >= 15) {
                var showval = output.substring(0, 15) + '...';
                return showval
            }

            if (result.length > 1) {

                if (result[1].length == 1) {
                    output += "." + result[1].substring(0, 1) + '0';
                } else {
                    output += "." + result[1].substring(0, 2);
                }
            } else {
                output += ".00";
            }

            return output;
        }
    }
}

function INR() {
    return function (input, arg) {
        if (!isNaN(input)) {

            if (input === '0' || input === null) {
                return 0;
            }
            //var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!           
            var isNegative = parseFloat(input) < 0;
            input = Math.abs(parseFloat(input));
            var result = input.toString().split('.');
            var lastThree = result[0].substring(result[0].length - 3);
            //               console.log(lastThree.length)
            //                if(lastThree.length <= 3)
            //                    return lastThree+"."+result[1];
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            if (arg === 'ret') {
                if (output.length >= 15) {
                    var showval = output.substring(0, 15) + '...';
                    showval = (isNegative ? '-' : '') + showval;
                    return showval;
                }
            }
            if (result.length > 1) {
                if (result[1].length == 1) {
                    output += "." + result[1].substring(0, 1) + '0';
                } else {
                    output += "." + result[1].substring(0, 2);
                }
            } else {
                if (arg === 'pay') {
                    output = output;
                } else {
                    output += ".00";
                }
            }
            output = (isNegative ? '-' : '') + output;

            return output;
        }
    }
}


function INRCRDR() {
    return function (input, arg) {
        if (!isNaN(input)) {

            if (input === '0' || input === null) {
                return 0;
            }
            //var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!           
            var isNegative = parseFloat(input) < 0;
            input = Math.abs(parseFloat(input));
            var result = input.toString().split('.');
            var lastThree = result[0].substring(result[0].length - 3);
            //               console.log(lastThree.length)
            //                if(lastThree.length <= 3)
            //                    return lastThree+"."+result[1];
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            if (arg === 'ret') {
                if (output.length >= 15) {
                    var showval = output.substring(0, 15) + '...';
                    showval = showval + (isNegative ? ' DR' : ' CR');
                    return showval;
                }
            }
            if (result.length > 1) {
                if (result[1].length == 1) {
                    output += "." + result[1].substring(0, 1) + '0';
                } else {
                    output += "." + result[1].substring(0, 2);
                }
            } else {
                if (arg === 'pay') {
                    output = output;
                } else {
                    output += ".00";
                }
            }
            output = output + (isNegative ? ' DR' : ' CR');

            return output;
        }
    }
}

function noSpecialChar() {
    var link = function (scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function (inputValue) {
            if (inputValue == undefined)
                return ''
            var cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
            if (cleanInputValue != inputValue) {
                modelCtrl.$setViewValue(cleanInputValue);
                modelCtrl.$render();
            }
            return cleanInputValue;
        });
    };

    return {
        require: 'ngModel',
        restrict: 'A',
        link: link
    }
}

function totalfire() {
    return {
        restrict: 'A',
        link: function ($scope, iElm, iAttrs, controller) {

            (iElm).on('keyup mouseleave', function () {
                $scope.addTotal();
                $scope.updateTotalAmount();

            });
        }
    };
}

utilFunctions.$inject = ["$q", "$log", "cache", "version", "$rootScope", "$filter"];

function utilFunctions($q, $log, cache, version, $rootScope, $filter) {
    return {
        initCache: function () {
            var cversion = cache.get('version');
            if (cversion.length > 0) {
                if (cversion !== version) {
                    cache.clearAll();
                }
            } else {
                cache.set("version", version, 10000000000);
            }
            cache.removeExpired();
        },

        initLanguage: function (module) {
            var default_lang, l;
            if (navigator.cookieEnabled) {
                if (cache.get(module + ($().getCookie("Lang") || 'en')).length === 0) {
                    $rootScope.$emit("setDefaultLanguage");
                } else {
                    return cache.get(module + ($().getCookie("Lang") || 'en'));
                }
            } else {
                default_lang = $rootScope.lang || "en";
                if ($rootScope.langStore && $rootScope.langStore[module + default_lang]) {
                    return $rootScope.langStore[module + default_lang] || [];
                }
            }
        },

        createDialogue: function (config) {
            $("confirm-dialogue,error-dialogue,success-dialogue,error-dialogue-callback,success-model").remove();
            $(".modal-backdrop").remove();
            $("body").css({ "padding-right": "0" }).removeClass("modal-open");

            switch (config.type) {
                case 'Warning':
                    return ("<confirm-dialogue data-title='" + config.title + "' data-message='" + config.message + "' data-callback=\"" + config.callback + "()\" data-ok-title='" + config.ok_btn_title + "' data-cancel-title='" + config.cancel_btn_title + "'></confirm-dialogue>");
                case 'Error':
                    return ("<error-dialogue data-title='" + config.title + "' data-message='" + config.message + "' data-cancel-title='" + config.cancel_btn_title + "'></error-dialogue>");
                case 'ErrorCallback':
                    return ("<error-dialogue-callback data-title='" + config.title + "' data-message='" + config.message + "'   data-callback=\"" + config.callback + "()\" data-ok-title='" + config.ok_btn_title + "' ></error-dialogue>");
                case 'Success':
                    return ("<success-dialogue data-title='" + config.title + "' data-message='" + config.message + "'></success-dialogue>");
                case 'SuccessConfirm':
                    return ("<success-model data-title='" + config.title + "' data-message='" + config.message + "' data-callback=\"" + config.callback + "()\" data-ok-title='" + config.ok_btn_title + "' data-cancel-title='" + config.cancel_btn_title + "'></success-model>");
                // return ("<success-dialogue data-title='" + config.title + "' data-message='" + config.message + "'></success-dialogue>");

            }

        },

        _destroyDialogue: function () {
            var x = $("confirm-dialogue,error-dialogue,success-dialogue").find(".modal");
            if (x.length > 0) {
                $('#myModal').on('hidden', function () {
                    x.parent().remove();
                    $(".modal-backdrop").remove();
                });
                x.modal('hide');
            }
        },

        createAlert: function (config) {
            return ("<alert-message data-title='" + config.title + "' data-type='" + config.type + "' data-message='" + config.message + "' ></alert-message>");
        },

        createDeleteDialogue: function (config) {
            return ("<delete-dialogue data-warning-title='" + config.warning.title + "' data-success-title='" + config.success.title +
                "' data-error-title='" + config.error.title + "'data-warning-message='" + config.warning.message +
                "data-success-message='" + config.success.message + "' data-error-message='" + config.error.message + "'" +
                "' data-success-callback=\"" + config.callback + "()\" data-error-callback=\"" + config.callback + "()\" " +
                "data-warning-callback=\"" + config.callback + "()\" data-warning-ok-title='" + config.warning.ok_btn_title +
                "' data-warning-cancel-title='" + config.warning.cancel_btn_title + "'></delete-dialogue>");
        },

        maskString: function (str, type, length) {
            if (str === undefined) {
                return false;
            }
            if (!length) {
                length = str.length;
            }
            if (str && str !== undefined && str.length >= length) {
                var strlength = str.length,
                    masklength = length,
                    unmasklength = strlength - length,
                    returnStr;
                if (type === 'prepend') {
                    returnStr = (str.replace(RegExp('^([^~,]{' + masklength + '})([^~,]{' + unmasklength + '})$'),
                        "x".repeat(masklength) + "$2"));
                } else if (type === 'append') {
                    returnStr = (str.replace(RegExp('^([^~,]{' + unmasklength + '})([^~,]{' + masklength + '})$'), "$1" + "x".repeat(masklength)));
                }

                return returnStr;
            }
        },

        generateEntityId: function (array) {
            if (!array) {
                array = [];
            }
            var y = Math.max.apply(Math, array.map(function (o) {
                return o.eid;
            }));
            if (parseInt(y)) {
                y = y + 1;
            } else {
                y = 1;
            }
            if (($filter('ordinal')(array, 'eid', y)).length > 0) {
                return utilFun.generateEntityId(array);
            } else {
                return y;
            }
        }


    };
}

function error_msg() {
    this.error = {
        "HEAD_IGST": "Integrated Tax",
        "HEAD_IGST_R": "IGST",
        "HEAD_CGST": "Central Tax",
        "HEAD_CGST_R": "CGST ",
        "HEAD_SGST": "State/UT Tax",
        "HEAD_SGST_R": "SGST",
        "HEAD_CESS": "CESS",
        "HEAD_IGST_AMT": "Integrated Tax Amount(₹)",
        "HEAD_CGST_AMT": "Central Tax Amount(₹)",
        "HEAD_SGST_AMT": "State/UT Tax Amount(₹)",
        "HEAD_CESS_AMT": "CESS Amount(₹)",
        "LBL_NOT_VAL": "Note/Refund Voucher Value(₹)",
        "HEAD_SELECT_PERIOD": "Select Period",
    }
}

function maskedInput() {

    var directive = {
        restrict: 'EA',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            console.log("In link function");

            var addSpaces = function (value) {
                if (typeof (value) == typeof (undefined))
                    return value;
                var parsedValue = value.toString()
                    .replace(/[^\dA-Za-z]/g, '')
                    .replace(/(.{2})/g, '$1,').trim()
                    .toUpperCase()
                    .replace(/,$/, '');
                return parsedValue;
            }

            var removeSpaces = function (value) {
                if (typeof (value) == typeof (undefined))
                    return value;
                var parsedValue = value.toString().replace(/\s/g, '').replace(/-/g, '');
                return parsedValue;
            }

            var parseViewValue = function (value) {
                var viewValue = addSpaces(value);
                ngModel.$viewValue = viewValue;
                ngModel.$render();

                // Return what we want the model value to be
                return removeSpaces(viewValue);
            }

            var formatModelValue = function (value) {
                var modelValue = removeSpaces(value);
                ngModel.$modelValue = modelValue;
                return addSpaces(modelValue);
            }

            ngModel.$parsers.push(parseViewValue);
            ngModel.$formatters.push(formatModelValue);
        }
    };
    return directive;
}

function scrollDetector() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var raw = element[0];
            element.bind('scroll', function () {
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                    console.log("end of list");
                    scope.$apply(attrs.scrollDetector);
                }
            });
        }
    };
};

function multicolumncombo() {
    return {
        restrict: 'EA',
        scope: {

            Items: "=list",
            SelectedRow: "=row",
            placeHolder: "@placeholder",
            labels: "@extralables",
            SelectedValue: "@selectedvalue",
            DisplayValue: "@displayvalue",
            datasource: "=",
            datamember: "@",
            disablefn: "&",
            changefn: "&",
            onselectfn: "&",
            requiredfn: "&",
            itemList: "@"

        },
        controller: ['$scope', function ($scope) {

            $scope.currentElement = 100

            $scope.$watch("datasource[datamember]", function () {

                if ($scope.datasource[$scope.datamember]) {
                    if ($scope.Items) {
                        var index = $scope.Items.map(function (item) {
                            return item[$scope.SelectedValue];
                        }).indexOf($scope.datasource[$scope.datamember]);
                        if (index >= 0) {

                            var row = $scope.Items[index];
                            $scope.SelectedRow = row;
                            $scope.Items.splice(index, 1);
                            $scope.Items.splice(0, 0, row)
                        }
                    }
                }
            });

            $scope.$watch("Items", function (newValue, oldValue, scope) {
                if (typeof newValue != 'undefined' && newValue['length'] > 0) {
                    var index = $scope.Items.map(function (item) {
                        return item[$scope.SelectedValue];
                    }).indexOf($scope.datasource[$scope.datamember]);
                    if (index >= 0) {
                        var row = $scope.Items[index];
                        $scope.SelectedRow = row;
                        $scope.Items.splice(index, 1);
                        $scope.Items.splice(0, 0, row)
                    }
                }
            });


            $scope.SelectedItem = function (item) {
                $scope.SelectedRow = item;


                /*   $scope.inputitem = item[$scope.SelectedValue] */

            }

            $scope.loadMore = function () {
                console.log("loadMore");
                $scope.currentElement = $scope.currentElement + 100;
            }

            //   var myDiv=angular.element(document.querySelector('#combo'));
            //   myDiv.click(function(){
            //     // reset back to 20

            $scope.onOpenClose = function (isOpen) {
                if (!isOpen)
                    $scope.currentElement = 100;
            }
            //   })

        }],

        template: function (element, attrs) {
            var fields = attrs.displayvalue.split(",");
            var labels = attrs.extralables.split(",");
            var theme = attrs.hasOwnProperty('theme') ? "theme='" + attrs.theme + "'" : "theme='select2'";
            // var required = attrs.hasOwnProperty('required') ? "required='required'" : "";
            var title = attrs.hasOwnProperty('name') ? "name='" + attrs.name + "'" : "";

            var required = attrs.hasOwnProperty('requiredfn') ? "ng-required='requiredfn()'" : attrs.hasOwnProperty('required') ? "required='required'" : "";

            var disabled = "";
            if (attrs.hasOwnProperty('disabled')) disabled = "disabled='disabled'";
            if (attrs.hasOwnProperty('ngDisabled')) disabled = "ng-disabled='ngDisabled'";
            if (attrs.hasOwnProperty('disablefn')) disabled = "ng-disabled='disablefn()'";

            // var ngRequired = "";
            // if (attrs.hasOwnProperty('required')) ngRequired = "required='required'";
            // if (attrs.hasOwnProperty('ngRequired')) ngRequired = "ng-required='ngRequired'";
            // if (attrs.hasOwnProperty('requiredfn')) ngRequired = "ng-required='requiredfn()'";


            var htmlText = "<ui-select id=\"combo\" ng-model='datasource." + attrs.datamember + "'  refresh-delay='400' ng-change='SelectedItem($select.selected);changefn()' " +
                required + " " + title + " " + "ng-disabled='disablefn()'" + " " + "on-select='onselectfn($item,$model)'" +
                " uis-open-close=\"onOpenClose(isOpen)\" " + theme + " class='w-100'>" +
                "<ui-select-match allow-clear='true' placeholder={{placeHolder}}>{{$select.selected." +
                fields[0] + " || $select.selected}}</ui-select-match>" +
                "<ui-select-choices   repeat='item." + attrs.selectedvalue + " as item in Items | filter:$select.search | limitTo:currentElement' scroll-detector=\"loadMore()\">" +
                "<div ng-bind-html='item." + fields[0] + " | highlight: $select.search' ></div>"

            if (fields.length > 1) {
                htmlText += "<small> ";

                for (var i = 1; i < fields.length; i++) {
                    if (i == 1)
                        htmlText += (labels.length >= i ? labels[i - 1] + ": " : "") + " {{item." + fields[i] + "}}";
                    else
                        htmlText += ", " + (labels.length >= i ? labels[i - 1] + ": " : "") +
                            " <span ng-bind-html='item." + fields[i] + " | highlight: $select.search'></span>";
                }

                htmlText += "</small>"
            }

            htmlText += "</ui-select-choices></ui-select>";


            return htmlText;
        },


        compile: function (element, attrs) {
            //do whatever else is necessary
        }

    };
}

function numricOnly() {
    // return {
    //     restrict: 'A',
    //     require: 'ngModel',
    //     link: function (scope, element, attrs, ctrl) {
    //         element.on('keypress', function (e) {
    //             var char = e.char || String.fromCharCode(e.charCode);
    //             if (!/^[0-9]$/i.test(char)) {
    //                 e.preventDefault();
    //                 return false;
    //             }
    //         });

    //         function parser(value) {
    //             if (ctrl.$isEmpty(value)) {
    //                 return value;
    //             }


    //             return formatedValue;
    //         }
    //         ctrl.$parsers.push(parser);
    //     }
    // };
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
}

function combiOnly() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            element.on('keypress', function (e) {
                var char = e.char || String.fromCharCode(e.charCode);
                if (!/^[A-Za-z0-9\s]$/i.test(char)) {
                    e.preventDefault();
                    return false;
                }
            });

            function parser(value) {
                if (ctrl.$isEmpty(value)) {
                    return value;
                }
                var formatedValue = value.toUpperCase();
                if (ctrl.$viewValue !== formatedValue) {
                    ctrl.$setViewValue(formatedValue);
                    ctrl.$render();
                }
                return formatedValue;
            }

            function formatter(value) {
                if (ctrl.$isEmpty(value)) {
                    return value;
                }
                return value.toUpperCase();
            }

            ctrl.$formatters.push(formatter);
            ctrl.$parsers.push(parser);
        }
    };
}

numericInput.$inject = ['$filter', '$locale'];

function numericInput($filter, $locale) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModelCtrl) {
            var replaceRegex = new RegExp($locale.NUMBER_FORMATS.GROUP_SEP, 'g');
            var fraction = $attrs.fraction || $locale.NUMBER_FORMATS.PATTERNS[0].gSize;
            var listener = function () {
                var value = $element.val().replace(replaceRegex, '');
                $element.val($filter('number')(value, fraction));
            }

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function (viewValue) {
                var newVal = viewValue.replace(replaceRegex, '');
                var newValAsNumber = newVal * 1;

                // check if new value is numeric, and set control validity
                if (isNaN(newValAsNumber)) {
                    ngModelCtrl.$setValidity(ngModelCtrl.$name + 'Numeric', false);
                } else {
                    newVal = newValAsNumber.toFixed(fraction);
                    ngModelCtrl.$setValidity(ngModelCtrl.$name + 'Numeric', true);
                }
                return newVal;

            })

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function () {
                $element.val($filter('number')(ngModelCtrl.$viewValue, fraction));
            }

            $element.bind('change', listener);
            $element.bind('keydown', function (event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, home, end, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (35 <= key && key <= 40))
                    return;
                //$browser.defer(listener) // Have to do this or changes don't get picked up properly
            });

            //$element.bind('paste cut', function() {
            //                $browser.defer(listener)  
            //            })
        }

    };
}

navbar.$inject = ['companyinfo'];

function navbar(companyinfo) {
    return {
        restrict: 'EA',
        require: "ngModel",
        scope: {
            navtype: "@",
            pagefor: "=",
            actionfn: "&",
            ngModel: "=",
            formid: "@",


        },
        templateUrl: "components/navbar.html",
        //     template:`<div
        //     style="background-image: linear-gradient(0deg, DodgerBlue,lightskyblue); display: flex; flex-wrap: nowrap;width: 100%;">

        //     <div>
        //         <button id="new" class="dss_nav_btn" ng-click="check('new')"><i
        //                 class="fa fa-plus-square fa-md" style="color:green !important;font-size: 18px;"></i>&nbsp;&nbsp;New</button>
        //     </div>
        //     <div>
        //         <button id="edit" class=" dss_nav_btn" ng-click="check('edit')"><i
        //                 class="fa fa-pencil-square-o fa-md"  aria-hidden="true" style="color:chartreuse !important;font-size: 18px;"></i>&nbsp;&nbsp;Edit</button>
        //     </div>
        //     <div id="sep1" style="color: rgba(255, 255, 255, 0.336);font-size: 20px  ">|</div>
        //     <div>
        //         <button id="save" class=" dss_nav_btn" ng-click="check('save')"><i class="fa fa-save fa-md"
        //                 style="color:indigo !important;font-size: 18px;"></i>&nbsp;&nbsp;Save</button>
        //     </div>
        //     <div>
        //         <button id="undo" class=" dss_nav_btn" ng-click="check('undo')"><i
        //                 class="fa fa-undo fa-md"></i>&nbsp;&nbsp;Undo</button>
        //     </div>
        //     <div id="sep2" style="color: rgba(255, 255, 255, 0.336);font-size: 20px  ">|</div>
        //     <div>
        //         <button id="print" class=" dss_nav_btn" ng-click="check('print')"><i class="fa fa-print fa-md"
        //                 style="color:red;font-size: 18px;"></i>&nbsp;&nbsp;Print</button>
        //     </div>
        //     <div>
        //         <button id="mail" class=" dss_nav_btn" ng-click="check('mail')"><i class="fa fa-envelope fa-md"
        //                 style="color:yellow;font-size: 18px;"></i>&nbsp;&nbsp;Mail</button>
        //     </div>
        //     <div>
        //         <button id="export" class=" dss_nav_btn" ng-click="check('export')"><i class="fa fa-truck fa-md" aria-hidden="true" 
        //                 style="color:rgb(152, 131, 172);font-size: 18px;"></i>&nbsp;&nbsp;E-Way Bill</button>
        //     </div>
        //     <div id="sep3" style="color: rgba(255, 255, 255, 0.336);font-size: 20px  ">|</div>

        //     <div>
        //         <button id="attach" class=" dss_nav_btn" ng-click="check('export')"><i class="fa fa-paperclip fa-md"
        //                 style="color:goldenrod;font-size: 18px;"></i>&nbsp;&nbsp;Attach</button>
        //     </div>
        //     <div id="sep4" style="color: rgba(255, 255, 255, 0.336);font-size: 20px  ">|</div>
        //     <div>
        //         <button id="close" class=" dss_nav_btn" ng-click="check('close')"><i class="fa fa-times-circle fa-md"
        //                 style="color:firebrick;font-size: 18px;"></i>&nbsp;&nbsp;Close</button>
        //     </div>

        // </div>`,


        controller: ['$scope', '$rootScope', function ($scope, $root) {

            $scope.customStyle = {};
            var enabled = false;

            // $scope.$watch("$rootScope.mode", function () {
            $scope.$watch('$root.mode', function () {

                if ($root.mode && Object.keys($root.mode).length > 0)

                // if($scope.ngModel!=undefined)
                {
                    switch ($root.mode) {
                        case "save": {
                            enabled = document.getElementById("save").disabled == false;
                            break;
                        }
                        case "undo": {
                            enabled = document.getElementById("undo").disabled == false;
                            break;
                        }
                        case "new": {
                            enabled = document.getElementById("new").disabled == false;
                            break;
                        }

                        case "edit": {
                            enabled = document.getElementById("edit").disabled == false;
                            break;
                        }

                        case "close": {
                            enabled = true;
                            break;
                        }
                    }
                    if (enabled)
                        $scope.check($rootScope.mode);
                    else {

                        $scope.uncheck();
                    }
                }
            })



            $scope.Addenable = function () {
                $scope.customStyle.style = {
                    "background-color": "transparent",
                    "border": "none;",
                    "color": " white",
                    "padding": "8px 6px",
                    " font - size": "14px",
                    " cursor": "pointer",
                    "font - weight": "bold !important",
                    "font - family": "Calibri, 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans - serif",
                    "display": " inline - block",
                    "margin - bottom": " 0",
                    "font - size": "14px",
                    "font - weight": "normal",
                    "line - height": "1.42857143",
                    "text - align": "center",
                    "white - space": "nowrap",
                    "vertical - align": "middle",
                    "cursor": " pointer",
                    "-webkit - user - select": "none",
                    "-moz - user - select": " none",
                    "-ms - user - select": " none",
                    "user - select": "none",
                    "background - image": "none",
                    "border": "1px solid transparent",
                    "border - radius": " 4px"
                }

            }
            $scope.disable = function () {
                $scope.customStyle.style = {
                    "color": "red",
                    "background-color": "lightskyblue",
                    "border": "none;",
                    "padding": "8px 6px",
                    " font - size": "14px",
                    " cursor": "pointer",
                    "font - weight": "bold !important",
                    "font - family": "Calibri, 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans - serif",
                    "display": " inline - block",
                    "margin - bottom": " 0",
                    "font - size": "14px",
                    "font - weight": "normal",
                    "line - height": "1.42857143",
                    "text - align": "center",
                    "white - space": "nowrap",
                    "vertical - align": "middle",
                    "cursor": " pointer",
                    "-webkit - user - select": "none",
                    "-moz - user - select": " none",
                    "-ms - user - select": " none",
                    "user - select": "none",
                    "background - image": "none",
                    "border": "1px solid transparent",
                    "border - radius": " 4px"
                }
            }
        }],



        controller: ['$scope', '$rootScope', function ($scope, $root) {

            $scope.customStyle = {};
            var enabled = false;

            // $scope.$watch("$rootScope.mode", function () {
            $scope.$watch('$root.mode', function () {

                if ($root.mode && Object.keys($root.mode).length > 0)

                // if($scope.ngModel!=undefined)
                {
                    switch ($root.mode) {
                        case "save": {
                            enabled = document.getElementById("save").disabled == false;
                            break;
                        }
                        case "undo": {
                            enabled = document.getElementById("undo").disabled == false;
                            break;
                        }
                        case "new": {
                            enabled = document.getElementById("new").disabled == false;
                            break;
                        }

                        case "edit": {
                            enabled = document.getElementById("edit").disabled == false;
                            break;
                        }

                        case "close": {
                            enabled = true;
                            break;
                        }
                    }
                    if (enabled)
                        $scope.check($rootScope.mode);
                    else {

                        $scope.uncheck();
                    }
                }
            })



            $scope.Addenable = function () {
                $scope.customStyle.style = {
                    "background-color": "transparent",
                    "border": "none;",
                    "color": " white",
                    "padding": "8px 6px",
                    " font - size": "14px",
                    " cursor": "pointer",
                    "font - weight": "bold !important",
                    "font - family": "Calibri, 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans - serif",
                    "display": " inline - block",
                    "margin - bottom": " 0",
                    "font - size": "14px",
                    "font - weight": "normal",
                    "line - height": "1.42857143",
                    "text - align": "center",
                    "white - space": "nowrap",
                    "vertical - align": "middle",
                    "cursor": " pointer",
                    "-webkit - user - select": "none",
                    "-moz - user - select": " none",
                    "-ms - user - select": " none",
                    "user - select": "none",
                    "background - image": "none",
                    "border": "1px solid transparent",
                    "border - radius": " 4px"
                }

            }
            $scope.disable = function () {
                $scope.customStyle.style = {
                    "color": "red",
                    "background-color": "lightskyblue",
                    "border": "none;",
                    "padding": "8px 6px",
                    " font - size": "14px",
                    " cursor": "pointer",
                    "font - weight": "bold !important",
                    "font - family": "Calibri, 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans - serif",
                    "display": " inline - block",
                    "margin - bottom": " 0",
                    "font - size": "14px",
                    "font - weight": "normal",
                    "line - height": "1.42857143",
                    "text - align": "center",
                    "white - space": "nowrap",
                    "vertical - align": "middle",
                    "cursor": " pointer",
                    "-webkit - user - select": "none",
                    "-moz - user - select": " none",
                    "-ms - user - select": " none",
                    "user - select": "none",
                    "background - image": "none",
                    "border": "1px solid transparent",
                    "border - radius": " 4px"
                }
            }
        }],

        link: function (scope, el, attrs, ngModel) {

            var checkfuncion = function (scope, res) {
                var allow = companyinfo.user.grants;
                if ((res == "new" && allow.A == true) || (res == "edit" && allow.E == true)) {
                    document.getElementById("new").disabled = true;
                    document.getElementById("edit").disabled = true;
                    document.getElementById("print").disabled = true;
                    //  document.getElementById("mail").disabled = true;
                    document.getElementById("attach").disabled = true;
                    document.getElementById("export").disabled = true;
                    document.getElementById("save").disabled = false;
                    document.getElementById("undo").disabled = false;
                    //document.getElementById("close").disabled = false;


                    document.getElementById("new").style.color = "gray";
                    document.getElementById("edit").style.color = "gray";
                    document.getElementById("print").style.color = "gray";
                    //  document.getElementById("mail").style.color = "gray";
                    document.getElementById("attach").style.color = "gray";
                    document.getElementById("export").style.color = "gray";
                    document.getElementById("upload").style.color = "gray";

                    document.getElementById("save").style.color = "white";
                    document.getElementById("undo").style.color = "white";

                    /*    scope.disableform(false); */

                } else {

                    document.getElementById("new").disabled = allow.A == true ? false : true;
                    document.getElementById("edit").disabled = allow.E == true ? false : true;
                    document.getElementById("print").disabled = allow.P == true ? false : true;
                    //  document.getElementById("mail").disabled = allow.P == true ? false : true;;
                    document.getElementById("attach").disabled = false;
                    document.getElementById("export").disabled = allow.P == true ? false : true;;
                    document.getElementById("upload").disabled = false;
                    document.getElementById("save").disabled = true;
                    document.getElementById("undo").disabled = true;

                    //document.getElementById("close").disabled = false;


                    document.getElementById("new").style.color = allow.A == true ? "white" : "gray";
                    document.getElementById("edit").style.color = allow.E == true ? "white" : "gray";
                    document.getElementById("print").style.color = allow.P == true ? "white" : "gray";
                    // document.getElementById("mail").style.color = allow.P == true ? "white" : "gray";
                    document.getElementById("attach").style.color = "white";
                    document.getElementById("export").style.color = allow.P == true ? "white" : "gray";
                    document.getElementById("upload").style.color = "white";

                    document.getElementById("save").style.color = "gray";
                    document.getElementById("undo").style.color = "gray";

                    /* scope.disableform(true); */
                }

            }

            if (scope.pagefor == "APPROVAL") {
                document.getElementById("save").innerHTML = '<i class="fa fa-save fa-md"></i>&nbsp;&nbsp;Approval';
                document.getElementById("undo").innerHTML = '<i class="fa fa-undo fa-md"></i>&nbsp;&nbsp;Reject';
            }


            if (scope.navtype == "M") {

                document.getElementById("print").style.display = "none";
                //   document.getElementById("mail").style.display = "none";
                document.getElementById("attach").style.display = "none";
                document.getElementById("export").style.display = "none";
                document.getElementById("upload").style.display = "none";
                document.getElementById("sep3").style.display = "none";
                document.getElementById("sep4").style.display = "none";
            }


            if (scope.navtype == "MU") {

                document.getElementById("print").style.display = "none";
                //   document.getElementById("mail").style.display = "none";
                document.getElementById("attach").style.display = "none";
                document.getElementById("export").style.display = "none";
                document.getElementById("sep3").style.display = "none";
                document.getElementById("sep4").style.display = "none";
            }

            if (scope.navtype == "MUP") {



                document.getElementById("attach").style.display = "none";
                document.getElementById("export").style.display = "none";

                document.getElementById("sep3").style.display = "none";
                document.getElementById("sep4").style.display = "none";
            }

            if (scope.navtype == "MP") {

                document.getElementById("upload").style.display = "none";
                document.getElementById("attach").style.display = "none";
                document.getElementById("export").style.display = "none";
                document.getElementById("sep3").style.display = "none";
                document.getElementById("sep4").style.display = "none";
            }

            var val = scope.ngModel;
            if (!isNaN(ngModel.$viewValue))
                val = ngModel.$viewValue;
            checkfuncion(scope, val);
            scope.check = function (res) {
                ngModel.$setViewValue(res);
                ngModel.$commitViewValue();
                scope.actionfn().then(function (promise) {
                    if (promise == "OK")
                        checkfuncion(scope, res);

                })
                //  scope.$root.mode = {};

            }

            scope.uncheck = function () {
                ngModel.$setViewValue(ngModel.$$lastCommitedViewValue);
                ngModel.$commitViewValue();
                scope.$root.mode = {};

            }

            if (attrs.hasOwnProperty("disablebtn")) {
                var disableBtns = attrs.disablebtn.split(",");
                for (var i = 0; i < disableBtns.length; i++)

                    document.getElementById(disableBtns[i]).style.display = "none";
            }
        }


    }
}


attachfile.$inject = ['$q', 'ajax'];
function attachfile($q, ajax) {


    var createImg = function (file, Quality) {
        var defer = $q.defer();
        //convert file to bloburl
        const blobURL = URL.createObjectURL(file);

        const img = new Image();

        img.src = blobURL;

        img.onerror = function () {
            return defer.reject();
            // Handle the failure properly
            console.log("Cannot load image");
        };

        var ctrl = { OriginFile: file, MIME_TYPE: "image/jpeg", QUALITY: Quality };
        img.onload = function () {
            const canvas = document.createElement("canvas");

            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
                (blob) => {
                    // Handle the compressed image. es. upload or save in local state
                    //  console.log('Compressed file', blob);
                    blob.name = ctrl.OriginFile.name;

                    // $scope.$apply(function () {

                    //  })

                    defer.resolve(new File([blob], blob.name, { lastModified: new Date().getTime(), type: blob.type }))

                },
                ctrl.MIME_TYPE,
                ctrl.QUALITY
            );


        }
        return defer.promise;
    };

    var imgResizerModalshow = function (file) {
        var reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function () {

            document.querySelector("#imgresize").src = reader.result;

            document.querySelector("#myImg").src = reader.result;

            $('#imgResizerModal').modal('show');
        }
    };


    return {
        MIME_TYPE: "image/jpeg",
        QUALITY: 1,
        OriginFile: null,
        FileObject: null,
        formdata: null,
        resize: false,
        SelectedFile: null,
        readableBytes: function (bytes) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return '0 Byte';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        },



        GetFile: function ($files) {
            var defer = $q.defer();
            var formdata = new FormData();
            angular.forEach($files, function (value, key) {
                formdata.append(key, value);
            });
            $q.all(formdata).then(function () {
                defer.resolve(formdata);
            })
            return defer.promise;
        },

        onSelectFile: function (ev) {
            if (ev) {


                var ctrl = this;
                ctrl.OriginFile = ev[0];
                ctrl.SelectedFile = ev[0];
                ctrl.OriginFile.imagesize = ctrl.readableBytes(ctrl.OriginFile.size);

                if (ctrl.OriginFile.name.match(/.(jpg|jpeg|png|gif)$/i)) {
                    if (ctrl.OriginFile.size >= 1000000) {
                        //if file object is grater than 1mb
                        //  $scope.$apply(function () {

                        createImg(ctrl.OriginFile, 1).then(function (file) {
                            ctrl.FileObject = file;
                            // ctrl.formdata = new FormData();
                            // ctrl.formdata.append('file', this.FileObject);




                            if (ctrl.FileObject.size >= 1000000) {
                                imgResizerModalshow(ctrl.FileObject)
                            }
                            else {
                                ctrl.OriginFile = ctrl.FileObject;
                                ctrl.OriginFile.imagesize = ctrl.readableBytes(ctrl.FileObject.size);

                            }


                        });

                        // })

                    } else {
                        //if file object is less than 1mb
                        ctrl.OriginFile.imagesize = ctrl.readableBytes(ctrl.OriginFile.size);
                        // ctrl.formdata = new FormData();
                        // ctrl.formdata.append('file', ctrl.OriginFile);

                    }

                } else {
                    ctrl.GetFile(ctrl.OriginFile).then(function (res) {
                        ctrl.OriginFile.imagesize = ctrl.readableBytes(ctrl.OriginFile.size);
                        // ctrl.formdata = res;

                    })
                }
            }
        },


        uploadFiles: function (data, params) {
            var defer = $q.defer();
            ajax.postbyurl("document/upload", data, params,
                {
                    'Content-Type': undefined
                }
            ).then(function (res) {
                defer.resolve(res);
            }, function (err) {
                defer.reject(err)
            })
            return defer.promise;
        },
        showDoc: function (branch_id, div_id, item) {
            ajax.get("Document/getDoc", null, { branch_id: branch_id, div_id: div_id, filename: item.filepath }, null, null, null, null, null, 'arraybuffer').then(function (res) {

                var extArray = item.filepath.split('.');
                var extName = extArray[extArray.length - 1];
                var contentType = "application/pdf"
                if (angular.$$lowercase(extName) != "pdf")
                    contentType = "image/" + extName;

                var blob = new Blob([res], { type: contentType });
                //                     headers = headers();
                // Get the filename from the x-filename header or default to "download.bin"
                var objectUrl = URL.createObjectURL(blob);
                window.open(objectUrl);

            })
        },
        delDoc: function (branch_id, div_id, filename) {
            var defer = $q.defer();
            ajax.postbyurl("document/delDoc", null, { branch_id: branch_id, div_id: div_id, filename: filename }).then(function (res) {

                defer.resolve(res);


            }, function (err) {
                defer.reject(err)
            })
            return defer.promise;
        },
        DocSize: function (size) {
            return parseInt(size) / (1024 * 1024);
        },

        //work on move range input
        changeIMGQuality: (f, s) => {
            var q = s / 10;

            createImg(f.SelectedFile, q).then(function (file) {
                f.OriginFile = file;
                f.OriginFile.imagesize = f.readableBytes(f.OriginFile.size);
                // f.formdata = new FormData();
                // f.formdata.append('file', file);
                imgResizerModalshow(file)
            });

        },


        SaveImgResize: (f) => {
            if (f.OriginFile.size < 1000000) {
                $('#imgResizerModal').modal('hide');
            } else {
                alert("Sorry! Document Size is greater than 1MB")
            }
        },
        closeImgResizer: (f) => {
            f.OriginFile = {};
            document.getElementById('File1').value = null;
            $('#imgResizerModal').modal('hide');
        },
        imgResizerModal: function (f) {
            f.OriginFile = {};
            // dicument.getElementById('File1').src = "";
            if (f.OriginFile.size <= 1000000) {
                document.getElementById('File1').value = null;
                $("#imgResizer").modal('hide');
            } else {
                alert("Sorry! Document Size is greater than 1MB")
            }
        },
        editImage: function (f, yn) {
            f.resize = yn;
        },

        openfile: function (file) {
            // var extArray = file.name.split('.');
            // var extName = extArray[extArray.length - 1];
            // var contentType = "application/pdf"
            // if (angular.$$lowercase(extName) != "pdf")
            //     contentType = "image/" + extName;

            // var blob = new Blob([res], { type: contentType });
            //                     headers = headers();
            // Get the filename from the x-filename header or default to "download.bin"
            var objectUrl = URL.createObjectURL(file);
            window.open(objectUrl);


        }
        //img resizer

        //bytes to kb,mb conversion



    }


}

function RunningValue() {
    return {
        scope: {
            datasource: "="
        },
        link: function (scope, element, attrs) {


            if (attrs.hasOwnProperty("selectedvalue")) {
                var field2 = attrs.selectedvalue;
                var field1 = attrs.hasOwnProperty("valuemember") ? attrs.valuemember : "RunningValue";
                var runValue = 0;

                for (var i = 0; i < scope.data.length; i++) {
                    runValue += parseFloat(scope.data[i][field2]);;
                    scope.data[i][field1] = runValue;

                }
            }
        }
    }
}
function fileread() {
    return {
        scope: {
            fileread: "=",
            onFileRead: "&"
        },
        link: function (scope, element, attributes) {

            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;



                    });

                }
                reader.readAsDataURL(changeEvent.target.files[0]);

            });
        }
    }
}

function myEnter() {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
}

function checkoperation() {
    return function (input, uppercase) {
        var out = [];
        for (var i = 0; i < input.length; i++) {
            if (input[i].operation != 3) {
                out.push(input[i]);
            }
        }
        return out;
    }
}

function propsFilter() {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function (item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    var itm = item[prop]
                    if (itm != undefined)
                        if (itm.toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }

                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
}

function toArray() {
    return function (obj, addKey) {
        if (!angular.isObject(obj)) return obj;
        if (addKey === false) {
            return Object.keys(obj).map(function (key) {
                return obj[key];
            });
        } else {
            return Object.keys(obj).map(function (key) {
                var value = obj[key];
                return angular.isObject(value) ?
                    Object.defineProperty(value, '$key', {
                        enumerable: false,
                        value: key
                    }) : {
                        $key: key,
                        $value: value
                    };
            });
        }
    };
}

capitalize.$inject = ['$parse'];

function capitalize($parse) {

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {

            //Process input + return processed value
            var capitalize = function (inputValue) {
                if (inputValue) {
                    //Capitalize first word
                    //  var capitalized = inputValue.charAt(0).toUpperCase() + inputValue.substring(1);

                    //Capitalize all words (after space)
                    var capitalized = inputValue.replace(/^(.)|\s(.)/g, function (v) {
                        return v.toUpperCase();
                    });

                    if (capitalized !== inputValue) {
                        ngModel.$setViewValue(capitalized);
                        ngModel.$render();
                    }
                    return capitalized;
                }
            };

            //Push process function to model
            //Apply it right now
            var model = $parse(attr.ngModel);
            ngModel.$parsers.push(capitalize);
            capitalize(model(scope));
        }
    };

}

function uppercaseOnly() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            element.on('keypress', function (e) {
                var char = e.char || String.fromCharCode(e.charCode);
                // if (!/^[A-Z\s]$/i.test(char)) {
                //     e.preventDefault();
                //     return false;
                // }
            });

            function parser(value) {
                if (ctrl.$isEmpty(value)) {
                    return value;
                }
                var formatedValue = value.toUpperCase();
                if (ctrl.$viewValue !== formatedValue) {
                    ctrl.$setViewValue(formatedValue);
                    ctrl.$render();
                }
                return formatedValue;
            }

            function formatter(value) {
                if (ctrl.$isEmpty(value)) {
                    return value;
                }
                return value.toUpperCase();
            }

            ctrl.$formatters.push(formatter);
            ctrl.$parsers.push(parser);
        }
    };
}

R1Util.$inject = ["$compile", "utilFunctions", "$timeout"];

function R1Util($compile, utilFunctions, $timeout) {

    return {
        createAlert: createAlert,
        initCache: initCache,
        initLanguage: initLanguage,
        ShowErrorBox: ShowErrorBox
    };

    function initCache() {

    }

    function initLanguage(module) {
        var default_lang, l;
        if (navigator.cookieEnabled) {
            if (cache.get(module + ($().getCookie("Lang") || 'en')).length === 0) {
                $rootScope.$emit("setDefaultLanguage");
            } else {
                return cache.get(module + ($().getCookie("Lang") || 'en'));
            }
        } else {
            default_lang = $rootScope.lang || "en";
            if ($rootScope.langStore && $rootScope.langStore[module + default_lang]) {
                return $rootScope.langStore[module + default_lang] || [];
            }
        }
    }

    function createAlert($scope, iTy, iMsg, iConfirmFn) {
        $("#confirmDlg").remove();
        switch (iTy) {
            case 'Success':

                var conf = utilFunctions.createDialogue({
                    "type": "Success",
                    "title": "Success",
                    "message": iMsg
                });
                $('body').append($compile(conf)($scope));
                $("#successDlg").modal('show');
                $timeout(function () {
                    $("#successDlg").modal('hide');
                    if (iConfirmFn != null)
                        iConfirmFn();
                }, 3000); //success alert message timeout
                break;

            case 'Error':
                var conf = utilFunctions.createDialogue({
                    "type": "Error",
                    "title": "Error",
                    "cancel_btn_title": "OK",
                    "message": iMsg
                });
                $('body').append($compile(conf)($scope));
                $("#errorDlg").modal('show');
                break;

            case 'ErrorOk':
                var conf = utilFunctions.createDialogue({
                    "type": "Error",
                    "title": "Inform",
                    "cancel_btn_title": "OK",
                    "message": iMsg
                });
                $('body').append($compile(conf)($scope));
                $("#errorDlg").modal('show');
                $timeout(function () {
                    $("#errorDlg").modal('hide');
                }, 3000); //success alert message timeout
                break;

            case 'ErrorCallback':
                $scope.iConfirmFn = function () {
                    $("#errorCllbackDlg").modal('hide');
                    iConfirmFn();
                };
                var conf = utilFunctions.createDialogue({
                    "type": "ErrorCallback",
                    "title": "Error",
                    "ok_btn_title": "OK",
                    "callback": "iConfirmFn()",
                    "message": iMsg
                });
                $('body').append($compile(conf)($scope));
                $("#errorCllbackDlg").modal('show');
                $("confirm-dialogue,error-dialogue,success-dialogue").remove();
                $("body").css("padding-right", "0").removeClass("modal-open");
                break;

            case 'Warning':
                $scope.iConfirmFn = function () {
                    $("#confirmDlg").modal('hide');
                    iConfirmFn();
                };
                var conf = utilFunctions.createDialogue({
                    "type": "Warning",
                    "title": "Warning",
                    "message": iMsg,
                    "callback": "iConfirmFn()",
                    "ok_btn_title": "YES",
                    "cancel_btn_title": "NO"
                });
                $('body').append($compile(conf)($scope));
                // $("#confirmDlg").modal({
                //     show: true,
                //     backdrop: 'static'

                // });
                $("#confirmDlg").modal('show');
                // $('#confirmDlg').data('bs.modal').options.backdrop = 'static';
                break;

            case 'WarningOk':
                $scope.iConfirmFn = function () {
                    $("#confirmDlg").modal('hide');
                    iConfirmFn();
                };
                var conf = utilFunctions.createDialogue({
                    "type": "Warning",
                    "title": "Warning",
                    "message": iMsg,
                    "callback": "iConfirmFn()",
                    "ok_btn_title": "OK",
                    "cancel_btn_title": null
                });
                $('body').append($compile(conf)($scope));
                // $("#confirmDlg").modal({
                //     show: true,
                //     backdrop: 'static'

                // });
                $("#confirmDlg").modal('show');
                // $('#confirmDlg').data('bs.modal').options.backdrop = 'static';
                break;

            case 'SuccessConfirm':
                $scope.iConfirmFn = function () {
                    $("#successMdl").modal('hide');
                    iConfirmFn();
                };

                var conf = utilFunctions.createDialogue({
                    "type": "SuccessConfirm",
                    "title": "Success",
                    "message": iMsg,
                    "callback": "iConfirmFn()",
                    "ok_btn_title": "YES",
                    "cancel_btn_title": "NO"
                });

                $('body').append($compile(conf)($scope));

                $("#successMdl").modal({
                    show: true,
                    backdrop: 'static'
                });

                break;

        }
    }

    function ShowErrorBox($scope, iMsg) {
        $("#confirmDlg").remove();

        var conf = utilFunctions.createDialogue({
            "type": "Error",
            "title": "Error",
            "cancel_btn_title": "OK",
            "message": iMsg.msg

        });
        $('body').append($compile(conf)($scope));
        $("#errorDlg").modal({
            show: true,
            backdrop: 'static',

        });

    }

}



function errorDialogue() {
    return {
        restrict: "E",
        scope: {
            title: "@",
            message: "@",
            cancelTitle: "@"
        },

        template: '<div id="errorDlg" data-backdrop="static" class="modal fade" role="dialog" > <div class="modal-dialog  modal-dialog-centered sweet"><div class="modal-content"><div class="modal-body"><div class="m-icon m-error"><span class="x-mark"><span class="m-line m-left"></span><span class="m-line m-right"></span></span></div><h2>{{ title }}</h2><p ng-bind-html="message|trust"></p></div><div class="modal-footer"><button autofocus class="btn btn-primary" data-bs-dismiss="modal">{{ cancelTitle }}</button></div></div></div></div>'
        //   template: '<div id="errorDlg" data-backdrop="static" class="modal fade" role="dialog" > <div class="modal-dialog sweet"><div class="modal-content"><div class="modal-body"><div class="m-icon m-error"><span class="x-mark"><span class="m-line m-left"></span><span class="m-line m-right"></span></span></div><h2>{{ title }}</h2><textarea ng-model="message" style="width: 100%;border: 1px solid;border-color: var(--primary);" readonly></textarea></div><div class="modal-footer"><button autofocus class="btn btn-primary" data-dismiss="modal">{{ cancelTitle }}</button></div></div></div></div>'

    };
}

function envService() {
    this.environment = 'development';
    this.set = function (environment) {
        this.environment = environment;
    };

    this.get = function () {
        return this.environment;
    };

    this.is = function (environment) {
        return (environment === this.environment);
    };
    this.$get = function () {
        return this;
    };
}




myApp.directive('capitalize', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {

            var capitalize = function (inputValue) {
                switch (attrs.capitalize) {
                    case "toUpperCaseFirstChar":
                        return (inputValue || '').toUpperCaseFirstChar();
                    case "toLowerCaseFirstChar":
                        return (inputValue || '').toLowerCaseFirstChar();
                    case "toUpperCaseEachWord":
                        return (inputValue || '').toUpperCaseEachWord();
                    case "toLowerCaseEachWord":
                        return (inputValue || '').toLowerCaseEachWord();
                    case "toCamelCase":
                        return (inputValue || '').toCamelCase();
                    case "toUpperCase":
                        return (inputValue || '').toUpperCase();
                    case "toLowerCase":
                        return (inputValue || '').toLowerCase();
                    default:
                        return (inputValue || '').toUpperCase();
                }
            };
            if (ngModel) {
                ngModel.$formatters.push(capitalize);
                ngModel._$setViewValue = ngModel.$setViewValue;
                ngModel.$setViewValue = function (val) {
                    ngModel._$setViewValue(capitalize(val));
                    ngModel.$render();
                };
            } else {
                element.val(capitalize(element.val()));
                element.on("keypress keyup", function () {
                    scope.$evalAsync(function () {
                        element.val(capitalize(element.val()));
                    });
                });
            }
        }
    };
});

myApp.directive('format', ['$filter', '$locale', function ($filter, $locale) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) {
                return;
            }

            ctrl.$formatters.unshift(function (a) {
                $locale.NUMBER_FORMATS.PATTERNS[1].gSize = 2;
                if (attrs.format && attrs.format.length > 0) {
                    return $filter(attrs.format)(ctrl.$modelValue, '₹', attrs.fraction);
                }
                return ctrl.$modelValue;
            });
            ctrl.$parsers.push(function (input) {
                var myval = input;
                var patt15 = /^(\-?(\d{0,13})(\.\d{0,2})?)$/
                //var totalpatt= new RegExp("^(\-?(\d{0,15}|\d{0,11})(\.\d{0,2})?)$");
                if (attrs.id === 'invval') {
                    var patt15 = /^(\-?(\d{0,13})(\.\d{0,2})?)$/
                }

                if (patt15.test(myval)) {
                    var patt = new RegExp("₹");
                    if (patt.test(myval)) {
                        myval = myval.replace(/\,|₹/g, '');
                    }

                    var myval = myval.toString();

                    if (myval.split('.')[0].length > 13 && attrs.id !== 'invval') {
                        ctrl.$setViewValue(ctrl.$modelValue);
                        ctrl.$render();
                        return ctrl.$modelValue;
                    } else if (myval.split('.')[0].length > 13 && attrs.id === 'invval') {
                        ctrl.$setViewValue(ctrl.$modelValue);
                        ctrl.$render();
                        return ctrl.$modelValue;
                    } else {

                        ctrl.$render();
                        return myval;
                    }
                } else {
                    ctrl.$setViewValue(ctrl.$modelValue);
                    ctrl.$render();
                    return ctrl.$modelValue;
                }
            });
            elem.bind('keypress', function (e) {
                var key = e.keyCode || e.charCode || 0;
                if (key === 46 && parseInt(attrs.fraction, 10) === 0) {
                    e.preventDefault();
                    return false;
                }
                if (key === 46 && this.value.indexOf('.') >= 0) {
                    e.preventDefault();
                    return false;
                }
                if ($.inArray(key, [8, 9, 27, 13, 46]) !== -1 ||
                    // Allow: Ctrl+A, Command+A
                    (key === 65 && (e.ctrlKey === true || e.metaKey === true)) || key === 109) {
                    return;
                }
                //&& (e.keyCode < 96 || e.keyCode > 105)
                if (!attrs.isneg) {
                    if (e.altKey || e.shiftKey || (((key < 48 || key > 57)))) {
                        e.preventDefault();
                        return false;
                    }
                } else {
                    if (key !== 45) {
                        if (e.altKey || e.shiftKey || (((key < 48 || key > 57)))) {
                            e.preventDefault();
                            return false;
                        }
                    }
                }
                if (attrs.format.length == 0 && this.value > 100) {
                    e.preventDefault();
                    return false;
                }
            });
            elem.bind('focus', function (e) {
                if (parseFloat(ctrl.$modelValue) == 0) {
                    ctrl.$modelValue = '';
                    $(elem).val('');
                }
            });
            elem.bind('paste', function (e) {
                e.preventDefault();
            });
            elem.bind('blur', function (event) {
                var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                //elem.val($filter(attrs.format)(plainNumber, '₹', attrs.fraction));
                //$locale.NUMBER_FORMATS.PATTERNS[0].gSize = 2;
                $locale.NUMBER_FORMATS.PATTERNS[1].gSize = 2;
                scope.$apply(function () {
                    var value1 = parseFloat(plainNumber);
                    if (!isNaN(parseFloat(plainNumber).toFixed(attrs.fraction))) {
                        if (value1 >= 1000000000000000 && attrs.id === 'invval') {
                            var value = parseFloat(parseFloat(plainNumber).toFixed(attrs.fraction)) - 0.10;
                            ctrl.$setViewValue(value);
                        } else {
                            ctrl.$setViewValue(parseFloat(plainNumber).toFixed(attrs.fraction));
                        }
                    } else {
                        ctrl.$setViewValue("");
                    }

                    if (!isNaN(parseFloat(plainNumber).toFixed(attrs.fraction)) && attrs.format && attrs.format.length > 0) {
                        if (value1 >= 1000000000000000 && attrs.id === 'invval') {
                            var value = parseFloat(parseFloat(plainNumber).toFixed(attrs.fraction)) - 0.10;
                            elem.val($filter(attrs.format)(value.toString(), '₹', attrs.fraction));
                        } else {
                            elem.val($filter(attrs.format)(plainNumber, '₹', attrs.fraction));
                        }

                    } else {
                        elem.val($filter(attrs.format)(null, '₹', attrs.fraction));
                    }

                });
            });
        }
    };
}]);

myApp.filter('numtowords', function () {
    function isFloat(x) {
        return parseFloat(x);
    }

    function fract(n) {
        //commented as this is a reserved function, resultled in minification failure...also not used
        //return int(String(n).split('.')[1] || 0);
    }
    return function (value) {


        function toWords(a) {
            if (0 > a || $().getConstant("PAYMENT_MAX_NUM") < a) {
                return "Number is out of range";
            }
            var b = "",
                c, d, e, f, g;
            c = Math.floor(a / 1E7);
            a -= 1E7 * c;
            d = Math.floor(a / 1E5);
            a -= 1E5 * d;
            f = Math.floor(a / 1E3);
            a -= 1E3 * f;
            g = Math.floor(a / 100);
            a %= 100;
            e = Math.floor(a / 10);
            a = Math.floor(a % 10);
            0 < c && (b += toWords(c) + " Crore ");
            0 < d && (b += ("" === b ? "" : " ") + toWords(d) + " Lakhs ");
            0 < f && (b += ("" === b ? "" : " ") + toWords(f) + " Thousand ");
            g && (b += ("" === b ? "" : " ") + toWords(g) + " hundred ");
            c = " One Two Three Four Five Six Seven Eight Nine Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen Eightteen Nineteen".split(" ");
            d = "  Twenty Thirty Fourty Fifty Sixty Seventy Eighty Ninety".split(" ");
            if (0 < e || 0 < a) {
                2 > e ? b += c[10 * e + a] : (b += d[e], 0 < a && (b += "-" + c[a]));
            }
            "" == b && (b = "null");
            return b;
        }

        //if(value%1)

        if (value && isFloat(value) && !isNaN(value)) {
            var money = value.toString().split(".");

            var inwords = "Rupees " + toWords(money[0]);
            if (money.length == 2) {
                var paisa = parseInt((money[1].length <= 1 ? (money[1] * 10).toString() : money[1].toString()).substring(0, 2));

                inwords += " And Paise " + toWords(paisa);
            }
            return inwords + " Only";

        }
    };
});


myApp.directive('percentage', function () {
    var link = function (scope, element, attrs, ngModel) {
        var parsePercentage = function (input) {
            var oldValue = ngModel.$modelValue;
            var inputFloat = parseFloat(input);
            if (isNaN(inputFloat)) {
                input = input.replace(/^([^0-9]*)$/, '');
                ngModel.$setViewValue(input);
                ngModel.$render();
                return input;
            }
            if (RegExp(/^\.?\d+\.?\d{0,2}$/).test(input) && inputFloat >= 0 && inputFloat <= 999.99 || input === '') {
                if (RegExp(/^((\d{0,3}|999.99)(\.\d{0,2})?)$/).test(input)) {
                    return inputFloat;
                } else {
                    input = input.replace(/^0+/, '');
                    ngModel.$setViewValue(input);
                    ngModel.$render();
                    return input;
                }
            } else {
                if (input.indexOf('..') > -1) {
                    ngModel.$setViewValue(oldValue + '.');
                } else {
                    ngModel.$setViewValue(oldValue || '');
                }
                ngModel.$render();
                return oldValue;
            }
        };

        var formatPercentage = function (val) {
            if (val && !isNaN(val)) {
                var str = String(val).split('.');
                str[0] = str[0] || '0';
                str[1] = str[1] || '00';
                val = str[0] + '.' + (str[1].length == 1 ? str[1] + '0' : str[1]) + ' %';
                return val;
            }
            return '0.00 %';
        };

        ngModel.$parsers.push(parsePercentage);
        ngModel.$formatters.push(formatPercentage);

        element.bind('blur', function () {
            if (!isNaN(ngModel.$modelValue) && parseFloat(ngModel.$modelValue) !== 0) {
                element.val(formatPercentage(ngModel.$modelValue));
            } else {
                element.val(formatPercentage(0));
                ngModel.$setViewValue(0);
                scope.$apply();
            }
        });
        element.bind('focus', function () {
            if (!isNaN(ngModel.$modelValue) && parseFloat(ngModel.$modelValue) !== 0) {
                element.val(ngModel.$modelValue);
            } else {
                element.val(null);
            }
        });
    };

    return {
        require: 'ngModel',
        restrict: 'A',
        link: link
    }
});

myApp.directive('hsnSac', function () {
    var link = function (scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function (input) {
            if (input == undefined)
                return '';

            var cleanInputValue = input.replace(/[^\d]/gi, '');
            cleanInputValue = cleanInputValue.length > 8 ? cleanInputValue.slice(0, -1) : cleanInputValue;

            if (cleanInputValue != input) {
                ngModel.$setViewValue(cleanInputValue);
                ngModel.$render();
            }
            if (cleanInputValue.length < 2) {
                return '';
            }
            return cleanInputValue;
        });
    }
    return {
        require: 'ngModel',
        restrict: 'A',
        link: link
    }
});

myApp.directive('noSpecialChar', function () {
    var link = function (scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function (inputValue) {
            if (inputValue == undefined)
                return ''
            var cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
            if (cleanInputValue != inputValue) {
                modelCtrl.$setViewValue(cleanInputValue);
                modelCtrl.$render();
            }
            return cleanInputValue;
        });
    };
    return {
        require: 'ngModel',
        restrict: 'A',
        link: link
    }
});


myApp.directive('highlight', function () {
    var component = function (scope, element, attrs) {

        if (!attrs.highlightClass) {
            attrs.highlightClass = 'text-highlight';
        }

        var replacer = function (match, item) {
            return '<span class="' + attrs.highlightClass + '">' + match + '</span>';
        }
        var tokenize = function (keywords) {
            keywords = keywords.replace(new RegExp(',$', 'g'), '').split(',');
            var i;
            var l = keywords.length;
            for (i = 0; i < l; i++) {
                keywords[i] = keywords[i].replace(new RegExp('^ | $', 'g'), '');
            }
            return keywords;
        }

        scope.$watch('keywords', function () {
            if (!scope.keywords || scope.keywords == '') {
                element.html(scope.highlight);
                return false;
            }
            var tokenized = tokenize(scope.keywords);
            var regex = new RegExp(tokenized.join('|'), 'gmi');
            var html = scope.highlight.replace(regex, replacer);
            element.html(html);
        });
    }
    return {
        link: component,
        replace: false,
        scope: {
            highlight: '=',
            keywords: '='
        }
    };
});

myApp.directive('dropdownBtn', function (ajax, $rootScope) {
    return {
        restrict: "E",
        scope: {
            btnName: "@",
            callBack: "&",
            url: '@',
            params: '=',
            clickedValue: "=",
            option: '='
        },
        link: function (scope, element, attrs) {
            scope.options = [];
            scope.toggle = function () {
                scope.showContent = !scope.showContent;
            };
            scope.buttonClick = function (a) {
                scope.clickedValue = scope.options[a];
                scope.callBack({
                    type: a
                });
            };
            if (scope.option)
                scope.options = scope.option;
            else
                ajax.post(scope.url, scope.params).then(function (response) {
                    scope.options = response;
                    !scope.$$phase && scope.$apply();
                });
            window.onclick = function (event) {
                if (!event.target.matches('.dropbtn') && !event.target.matches('.dropdwnSpan')) {
                    var dropdowns = document.getElementsByClassName("dropdown-content");
                    var i;
                    for (i = 0; i < dropdowns.length; i++) {
                        var openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')) {
                            openDropdown.classList.remove('show');
                        }
                    }
                }
            };
        },
        template: '<div class="dropdowngrp"><button ng-click="toggle()" class="btn btn-primary dropbtn"><span class="dropdwnSpan" ng-bind="btnName"></span>&nbsp;<span class="caret dropdwnSpan"></span></button><div id="myDropdown" class="dropdown-content" ng-class="{\'show\': showContent}"><a role="button" ng-repeat="(key,value) in options" ng-click="buttonClick(key)" ng-bind="value"></a></div></div>'
    };
});



myApp.directive('timepicker', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ctrl) {
            $(element).datepicker({
                date: false,
                time: true,
                format: 'hh:mm A',
                shortTime: true
            });
            element.on("paste", function () {
                var val = element.value;
                ctrl.$modelValue = val;
                ctrl.$viewValue = val;
                ctrl.$setViewValue(val);
                ctrl.$commitViewValue();
                ctrl.$render();
            })
        }
    };
});

myApp.service('translationSrv', ["$http", function ($http) {
    this.getTranslation = function (lang) {
        var languageFilePath = 'public/lang/' + lang + '/translation-' + lang + '.json';
        return $http.get(languageFilePath).then(function (response) {
            return response.data;
        });
    };
}]);

myApp.directive("ngFileSelect", ["ImageReader", function (ImageReader) {
    return {
        scope: {
            imgsrc: "=",
            progress: "="
        },
        link: function ($scope, el) {

            $scope.getFile = function () {
                $scope.progress = 0;
                ImageReader.readAsDataUrl($scope.file, $scope)
                    .then(function (result) {
                        $scope.imgsrc = result;
                    });
            };

            $scope.$on("fileProgress", function (e, progress) {
                $scope.progress = progress.loaded / progress.total;
            })


            el.bind("change", function (e) {

                $scope.file = (e.srcElement || e.target).files[0];
                $scope.getFile();
            })
        }
    }
}]);

myApp.directive("ngFiles", ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    }
}]);

function fileReader($q, $log) {

    var onLoad = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };

    var onProgress = function (reader, scope) {
        return function (event) {
            scope.$broadcast("fileProgress", {
                total: event.total,
                loaded: event.loaded
            });
        };
    };

    var getReader = function (deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };

    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();

        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);

        return deferred.promise;
    };

    return {
        readAsDataUrl: readAsDataURL
    };


};

function companyinfo() {
    this.company = {

        // firm_id: "1",
        // firm_name:"GHATAPRABHA FERTILIZER PVT. LTD.",
        // firm_pincode: "",
        // branch_id: "101",
        // branch_name: "HEAD OFFICE,SANGLI",
        // branch_pincode: "",
        // firm_stateid: 27,
        // branch_stateid: 27,
        // firm_gstin: "",
        // branch_gstin: "",
        // firm_gstur: "1",
        // branch_gstur: "1",
        // div_id: "20182019",
        // from_date: "2019-04-01",
        // to_date: "2020-03-31",
        // mindate:"2017-07-01",
        // fyprefix: "1819"
    }
    // var user=cache.get("user");

    // this.user=user==undefined ?{} :user;

    var grants = {
        A: true,
        //: = abc.localuser3.B,
        D: true,
        E: true,
        L: true,
        O: true,
        P: true,
    }

    this.user = {};
    this.user.grants = grants;
    this.master = {};
    this.last_api_calls = {};
    this.ip = { Public: publicIP, Local: localIP };
};

myApp.factory('transactionValid', ['$filter', 'companyinfo', function ($filter, companyinfo) {
    // CurrDate: function (dt) {
    //     var inputDate = new Date(dt);

    //     var now = $filter('date')(inputDate, 'yyyy-MM-dd');
    //     if (new Date(now) >= new Date(companyinfo.company.from_date) && new Date(now) <= new Date(companyinfo.company.to_date))
    //         return inputDate;

    //     else
    //         return new Date(companyinfo.company.to_date);

    // },

    var compareDate = function (sdt, edt, dt) {
        var date = new Date($filter('date')(dt, 'yyyy-MM-dd'));

        if (date >= sdt && date <= edt)
            return true;
        else
            return false;
    }

    return {
        CurrDate: function (dt) {
            var sdt = new Date(companyinfo.company.from_date);
            var edt = new Date(companyinfo.company.to_date);

            if (compareDate(sdt, edt, dt))
                return dt;
            else {
                // var dd = new Date(dt).getDate();
                // var mm = new Date(dt).getMonth();
                // var yy = sdt.getFullYear();

                // var newDate = new Date(yy, mm, dd);

                // if (compareDate(sdt, edt, newDate))
                //     return newDate;
                // else {
                //     yy = edt.getFullYear();

                //     return new Date(yy, mm, dd);
                // }
                return edt;
            }

        },

        monthsAgo: function (dt) {
            var sdt = new Date(companyinfo.company.from_date);
            var edt = new Date(companyinfo.company.to_date);

            var _f = new Date(dt);
            _f.setMonth(_f.getMonth() - 3);
            var _m = _f.getMonth() + 1;

            var _d = new Date(_f.getFullYear(), _m, 1);
            if (compareDate(sdt, edt, _d))
                return _d;
            else
                return sdt;
        }

    };
}]);

myApp.factory('Aggregate', function () {
    return {
        sum: function (array, column) {
            if (typeof array === "object" && array.length > 0) {




                var sumArray = array.map(value => {
                    var l = column.split(".");

                    var itm = Object.assign({}, value);
                    var c = 0;

                    for (var i = 0; i <= l.length; i++) {


                        if (itm[l[i]])
                            itm = itm[l[i]];
                        else
                            return 0

                        if (i + 1 === l.length)
                            if (itm)
                                return parseFloat(itm);
                            else
                                return 0;
                    }





                })

                var sumValue = sumArray.reduce(function (pValue, cValue) {
                    return pValue + cValue

                });

                return sumValue;

            }
            else

                return 0;

        },
        max: function (array, column) {
            if (typeof array === "object" && array.length > 0) {

                var maxArray = array.map(function (value) {
                    var l = column.split(".");

                    var itm = Object.assign({}, value);
                    var c = 0;

                    for (var i = 0; i <= l.length; i++) {


                        if (itm[l[i]])
                            itm = itm[l[i]];
                        else
                            return ' '

                        if (i + 1 === l.length)
                            return itm;


                    }

                })

                return Math.max(...maxArray)
            }
            else

                return 0;

        },
        min: function (array, column) {
            if (typeof array === "object" && array.length > 0) {
                var minArray = array.map(function (value) {

                    var l = column.split(".");

                    var itm = Object.assign({}, value);
                    for (var i = 0; i <= l.length; i++) {


                        if (itm[l[i]])
                            itm = itm[l[i]];
                        else
                            return ' '

                        if (i + 1 === l.length)
                            return itm;


                    }
                })
                return Math.min(...minArray)
            }
            else

                return 0;

        },
        avg: function (array, column) {
            if (typeof array === "object" && array.length > 0) {

                var sumArray = array.map(function (value) {
                    var l = column.split(".");

                    var itm = Object.assign({}, value);


                    for (var i = 0; i <= l.length; i++) {


                        if (itm[l[i]])
                            itm = itm[l[i]];
                        else
                            return 0

                        if (i + 1 === l.length)
                            return itm;


                    }
                })

                var sumValue = sumArray.reduce(function (pValue, cValue) {
                    return pValue + cValue

                });

                return sumValue / array.length;

            }
            else

                return 0;

        },
    };
});

myApp.directive('finDate', ['companyinfo', '$filter', function (companyinfo, $filter) {
    return {
        require: 'ngModel',

        link: function (scope, element, attrs, mCtrl) {
            if (attrs.required == true) {
                function myValidation(value) {
                    var value = new Date($filter('date')(value, 'yyyy-MM-dd'));
                    var sdt = new Date(companyinfo.company.from_date);
                    var edt = new Date(companyinfo.company.to_date);

                    if (value >= sdt && value <= edt) {
                        mCtrl.$setValidity('vchDate', true);
                    } else {
                        mCtrl.$setValidity('vchDate', false);
                    }
                    return value;
                }
                mCtrl.$parsers.push(myValidation);
            }
        }
    };
}]);

myApp.directive('modelValidate', ['companyinfo', '$filter', function (companyinfo, $filter) {
    return {


        scope: {
            ngModel: "",
            vfn: "&"

        },
        link: function (scope, element, attrs, mCtrl) {
            if (attrs.required == true) {
                function myValidation() {
                    var value = scope.vfn();


                    if (value === false) {
                        mCtrl.$setValidity(scope.ngModel, true);
                    } else {
                        mCtrl.$setValidity(scope.ngModel, false);
                    }
                    return value;
                }
                mCtrl.$parsers.push(myValidation);
            }
        }
    };
}]);

myApp.directive('refDate', ['companyinfo', '$filter', function (companyinfo, $filter) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, mCtrl) {
            // if (attrs.required == true) {
            function myValidation(value) {
                var value = new Date($filter('date')(value, 'yyyy-MM-dd'));

                var _f = new Date(companyinfo.company.from_date);
                var sdt = new Date(companyinfo.company.from_date);
                sdt.setMonth(_f.getMonth() - 6);
                var edt = new Date(companyinfo.company.to_date);

                if (value >= sdt && value <= edt) {
                    mCtrl.$setValidity('refDate', true);
                } else {
                    mCtrl.$setValidity('refDate', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
        // }
    };
}]);
myApp.directive('rdlcviewer', ['$sce', 'ajax', '$filter', 'companyinfo', function ($sce, ajax, $filter, companyinfo) {
    return {
        restrict: 'EA',
        scope: {
            url: "=",
            params: "="
        },

        template: function (element, attrs) {
            var width = attrs.hasOwnProperty('width') ? "width: " + attrs.width + ";" : "";
            var height = attrs.hasOwnProperty('height') ? "height: " + attrs.height + ";" : "";
            var style = "position: relative;left:0; right:0; padding-left:0px; border:none;" + width + height;

            var htmltext = '<div id="spinner" style="text-align:center;' + style + '"><i style="font-size:80px;color:lightskyblue;text-align:center;margin-top:10%" class="fa fa-refresh fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span></div>' +
                '<iframe id="ssrsiframe"  ng-onload="hidespinner()"  ng-src="{{trustedUrl}}" style="' + style + '"></iframe>';

            return htmltext;

        },
        link: function (scope) {

            var currDate = $filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
            var params = "currDate=" + currDate;

            // Not In Use
            // Sohan 22/04/21
            // if (ajax.tokenbaseApi)
            //     params += "&username=" + companyinfo.user.username + "&token=" + companyinfo.user.access_token;

            for (var i = 0; i < scope.params.length; i++) {
                params += "&" + scope.params[i].key + "=" + scope.params[i].value
            }

            scope.url = scope.url + "?" + params;

            scope.trustedUrl = $sce.trustAsResourceUrl(ajax.rpt_url + scope.url);

        },
        controller: ["$scope", function ($scope) {
            $scope.hidespinner = function () {
                $("#spinner").hide();

                // document.getElementById('gst2Regform').style.border="solid";

            }
        }]
    }
}]);


//FROM GFL 
myApp.directive("helper", function () {
    return {
        restrict: 'EA',
        require: '?ngModel',
        scope: {
            Items: "=list",
            SelectedRow: "=row",
            columnDefs: "=columns",
            sortBy: "@filter",

            SelectedValue: "@selectedvalue",
            datasource: "=datasource",
            ngModel: "=",
            hclick: "&",
            onselected: "&"

        },

        controller: ['$scope', '$filter', function ($scope, $filter) {

            $scope.reverse = false;
            $scope.curPage = 1;
            $scope.itemsPerPage = 25;

            //  $scope.maxSize = 30;
            //  $scope.filteredItems=$scope.Items;

            // $scope.numOfPages = function () {
            //     return Math.ceil($scope.filteredItems.length / $scope.itemsPerPage);

            // };

            // $scope.$watch('curPage + numPerPage', function () {
            //     var begin = (($scope.curPage - 1) * $scope.itemsPerPage),
            //         end = begin + $scope.itemsPerPage;

            //     $scope.pageItems = $scope.filteredItems.slice(begin, end);
            // });

            // $scope.searchfilter=function(){

            //     $scope.filteredItems=filterFilter($scope.Items,$scope.searchtext , true);

            // }

            // // $scope.failedSubjects = $filter('filter')($scope.Items, {'grade':'C'}, true);

            $scope.field = function (item, value) {
                if (value) {
                    var l = value.split(".");

                    var itm = Object.assign({}, item);
                    var c = 0;

                    // for (var x of l) {
                    // 
                    //     if (itm[x])
                    //         itm = itm[x];
                    //     else
                    //         return ' '
                    // 
                    //     c += 1;
                    //     if (c === l.length)
                    //         return itm;
                    // 
                    // }

                    // angular.forEach(l, function (x) {

                    //     if (itm[x])
                    //         itm = itm[x];
                    //     else
                    //         return ' '

                    //     c += 1;
                    //     if (c === l.length)
                    //         return itm;

                    // });

                    for (var i = 0; i <= l.length; i++) {
                        var v = l[i];

                        if (itm[l[i]])
                            itm = itm[l[i]];
                        else
                            return ' '

                        if (i + 1 === l.length)
                            return itm;
                    }



                }
            }

        }],

        template: function (element, attrs) {


            // var htmltext = "\<div id=\"" + attrs.helperid + "\" class=\"helpnav\">" +
            //     "<div  class=\"bg-primary p-1\" style=\"display: flex;justify-content:space-between;line-height:0px;\"><input style=\"padding:0px !important;line-height:0px;\" type=\"text\" ng-model=\"searchtext\" placeholder=\"Search\"/>" +
            //     "<a href=\"javascript:void(0)\" class=\"closebtn\"  ng-click=\"closeNav()\">&times;</a> </div>" +

            //     "<table class=\"table table-hover table-bordered mb-0 hidden-sm-down\" cellspacing=\"0\" style=\"color:black;z-index:1;\">" +
            //     "<thead class=\"thead-light\">" +
            //     "<tr class=\"bg-primary\">" +
            //     "<th ng-repeat=\"header in columnDefs\" ng-style=\"header.style\" class=\"text-center\">{{header.displayName}}</th>" +
            //     "</tr>" +
            //     "</thead>" +
            //     "<tbody  style=\"width:100%;height: calc(100vh - 232px);overflow-y:scroll;overflow-x:scroll;display:block;\">" +
            //     "<tr dir-paginate=\"item in Items| orderBy:sortBy|filter: searchtext| itemsPerPage: 50\" ng-click=\"closeNav(item)\">" +
            //     "<td style=\"max-width: 100px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;\" ng-repeat=\"row in columnDefs\" ng-style=\"row.style\">{{field(item,row.field)}}</td></tr>" +
            //     "</tbody></table>" +
            //     "<dir-pagination-controls  max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"></dir-pagination-controls></div>" +
            //     "<span style=\"font-size:10px;cursor:pointer ;padding:10px\" ng-click=\"openNav()\">&#9776;</span>"

            // return htmltext;



            var htmltext = "\<div id=\"" + attrs.helperid + "\" class=\"helpnav\">" +
                "<div  class=\"bg-primary p-1\" style=\"display: flex;justify-content:space-between;line-height:0px;\"><input style=\"padding:0px !important;line-height:0px;\" type=\"text\" ng-model=\"searchtext\" placeholder=\"Search\"/>" +
                "<a href=\"javascript:void(0)\" class=\"closebtn\"  ng-click=\"closeNav()\">&times;</a> </div>" +

                "<table class=\"table table-hover table-bordered mb-0\" cellspacing=\"0\" style=\"color:black;z-index:1;\">" +
                "<thead>" +
                "<tr class=\"bg-primary\">" +
                "<th ng-repeat=\"header in columnDefs\" ng-style=\"header.style\" class=\"text-center\">{{header.displayName}}</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody  style=\"height: calc(100vh - 232px);\">" +
                "<tr dir-paginate=\"item in Items| orderBy:sortBy|filter: searchtext| itemsPerPage: 50\" ng-click=\"closeNav(item)\">" +
                "<td style=\"max-width: 100px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;\" ng-repeat=\"row in columnDefs\" ng-style=\"row.style\">{{field(item,row.field)}}</td></tr>" +
                "</tbody></table>" +
                "<dir-pagination-controls  max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"></dir-pagination-controls></div>" +
                "<span style=\"font-size:10px;cursor:pointer ;padding:10px\" ng-click=\"openNav()\">&#9776;</span>"

            return htmltext;
        },

        link: function (scope, element, attrs, ctrl) {
            scope.width = attrs.width;
            scope.helperid = attrs.helperid;


            scope.openNav = function () {

                try {

                    scope.hclick().then(function () {
                        document.getElementById(scope.helperid).style.width = scope.width;
                        scope.searchtext = "";
                    })
                }
                catch (ex) {
                    document.getElementById(scope.helperid).style.width = scope.width;
                    scope.searchtext = "";
                }

            }

            scope.closeNav = function (item) {
                document.getElementById(scope.helperid).style.width = "0";
                if (item) {

                    scope.SelectedRow = item;
                    if (scope.datasource)
                        scope.datasource = item[scope.SelectedValue];

                    ctrl.$setViewValue(item[scope.SelectedValue]);
                    ctrl.$commitViewValue();
                    ctrl.$render();



                }
            }

        }
    };
});



myApp.service('ShareData', function () {

    return {};

});

myApp.service('commonService', function ($http) {

    var info;

    return {
        getInfo: getInfo,
        setInfo: setInfo
    };

    // .................

    function getInfo() {
        return info;
    }

    function setInfo(value) {
        info = value;
    }
});

myApp.service('modalform', function () {

    return {};

});

myApp.directive('sglclick', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            var fn = $parse(attr['sglclick']);
            var delay = 300, clicks = 0, timer = null;
            element.on('click', function (event) {
                clicks++;  //count clicks
                if (clicks === 1) {
                    timer = setTimeout(function () {
                        scope.$apply(function () {
                            fn(scope, { $event: event });
                        });
                        clicks = 0;             //after action performed, reset counter
                    }, delay);
                } else {
                    clearTimeout(timer);    //prevent single-click action
                    clicks = 0;             //after action performed, reset counter
                }
            });
        }
    };
}]);


myapp.service('Master', ['R1Util', 'orderByFilter', 'cache', 'ajax', '$q', 'companyinfo', '$filter', 'cfpLoadingBar', function (R1Util, orderBy, cache, ajax, $q, companyinfo, $filter, cfpLoadingBar) {


    this.formdisabled = function (mode) {
        if (mode == 'new' || mode == 'edit')
            return false;
        else
            return true;
    };



}]);



// Sohan -->

// myApp.directive('xyScroll', ['$log', '$document', '$timeout', function ($log, $document, $timeout) {
//     return {

//         scope: {
//             x: '=?',
//             y: '=?',
//             dragX: '=?',
//             dragY: '=?'
//         },

//         template: '<div class="xy-outer"><div class="xy-inner" ng-transclude></div>'
//             + '<div class="xy-scroll xy-scroll-x" ng-class="{active: isActive || dragging}">'
//             + '<div class="xy-bar xy-bar-x" ng-style="scrollX" ng-mousedown="beginDragX($event)"></div></div>'
//             + '<div class="xy-scroll xy-scroll-y" ng-class="{active: isActive || dragging}" ng-style="{paddingTop: topOffset}">'
//             + '<div class="xy-bar xy-bar-y" ng-style="scrollY" ng-mousedown="beginDragY($event)"></div></div></div>',

//         transclude: true,

//         link: function (scope, element, attrs) {
//             // ...
//             var startX = 0,
//                 startY = 0,
//                 x = 0,
//                 y = 0;

//             var accelerationTimer = null,
//                 accelerationDelay = null,
//                 speed = 0.5,
//                 speedX = 1,
//                 speedY = 1;

//             var content = element.find('.xy-content'),
//                 header = element.find('.xy-header-left'),
//                 top = element.find('.xy-header-top'),
//                 corner = element.find('.xy-corner'),
//                 inner = content.parent(), //element.find('.xy-inner'),
//                 child = content.children();

//             scope.dragging = false;
//             scope.isActive = false;

//             scope.scrollX = {
//                 left: 0,
//                 width: 100,
//                 // opacity: 1
//             };

//             scope.scrollY = {
//                 top: 0,
//                 height: 30,
//                 // opacity: 1
//             };

//             scope.topOffset = 0;

//             $timeout(function () {
//                 setup();
//                 resize();
//             });

//             function setup() {
//                 inner.on('mousewheel wheel', mousewheel);

//                 if (scope.dragX || scope.dragY) {
//                     content.on('mousedown', mousedown);
//                 }

//                 content.on('mouseover', mouseover);
//                 content.on('mouseout', mouseout);
//                 content.on('touchstart', touchstart); //touch test

//                 var resizeEvent = attrs["resize"];

//                 if (resizeEvent) { //optional resize via scope.$boardcast
//                     scope.$on(resizeEvent, function () {
//                         $timeout(resize, 0);
//                     });
//                 }

//                 var resetEvent = attrs["reset"];

//                 if (resetEvent) {
//                     scope.$on(resetEvent, function () {
//                         $timeout(restart, 0);
//                     });
//                 }

//             }

//             function resize() {
//                 //top header
//                 scope.topOffset = getTopOffset();
//                 corner.height(scope.topOffset);
//                 top.height(scope.topOffset);
//                 //scrollbar
//                 scope.scrollX.width = getScrollWidth();
//                 scope.scrollY.height = getScrollHeight();
//                 speedX = getRatioX();
//                 speedY = getRatioY();
//                 //set position 
//                 scrollX();
//                 scrollY();
//             }

//             function restart() {
//                 x = 0;
//                 y = 0;
//                 scrollX();
//                 scrollY();
//                 update();
//             }

//             function mousewheel(event) {
//                 event.preventDefault();
//                 // support non-webkit browsers

//                 if (event.originalEvent != undefined) {
//                     event = event.originalEvent;
//                 }

//                 var delta = getWheelDelta(event); // event.wheelDeltaY || event.wheelDelta;
//                 delta = Math.floor(delta * accelerate());

//                 // shift or cmd(Mac) is pressed?
//                 if (event.shiftKey || event.metaKey) {
//                     moveX(-delta);
//                 } else {
//                     moveY(-delta);
//                 }

//                 update();
//             }

//             function getWheelDelta(event) {
//                 if (event.type == "wheel" || event.deltaY) {
//                     var delta = event.deltaX || event.deltaY;
//                     return (event.deltaMode == 0) ? -delta : -delta * 40; //line mode
//                 }
//                 if (event.type == "mousewheel") {
//                     return event.wheelDeltaY || event.wheelDelta;
//                 }
//             }

//             scope.beginDragX = function (event) {
//                 event.preventDefault();
//                 scope.dragging = true;
//                 startX = event.pageX;
//                 $document.on('mousemove', dragX);
//                 $document.one('mouseup', endDragX);
//             }

//             scope.beginDragY = function (event) {
//                 event.preventDefault();
//                 scope.dragging = true;
//                 startY = event.pageY;
//                 $document.on('mousemove', dragY);
//                 $document.one('mouseup', endDragY);
//             }

//             function dragX(event) {
//                 event.preventDefault();

//                 var delta = event.pageX - startX;
//                 startX += delta;
//                 moveX(delta * speedX);
//                 update();
//             }

//             function dragY(event) {
//                 event.preventDefault();

//                 var delta = event.pageY - startY;
//                 startY += delta;
//                 moveY(delta * speedY);
//                 update();
//             }

//             function endDragX(e) {
//                 scope.dragging = false;
//                 scope.$apply();
//                 $document.off('mousemove', dragX);
//                 $document.off('mouseup', endDragX);
//             }

//             function endDragY(e) {
//                 scope.dragging = false;
//                 scope.$apply();
//                 $document.off('mousemove', dragY);
//                 $document.off('mouseup', endDragY);
//             }

//             function mousedown(event) {
//                 // Prevent default dragging of selected content
//                 event.preventDefault();
//                 scope.dragging = true;
//                 startX = event.pageX - x;
//                 startY = event.pageY - y;
//                 $document.on('mousemove', mousemove);
//                 $document.one('mouseup', mouseup);
//             }

//             function mousemove(event) {
//                 event.preventDefault();
//                 if (scope.dragX) {
//                     x = limitX(event.pageX - startX);
//                     scrollX();
//                 }
//                 if (scope.dragY) {
//                     y = limitY(event.pageY - startY);
//                     scrollY();
//                 }
//                 update();
//             }

//             function mouseup() {
//                 scope.dragging = false;
//                 scope.$apply();
//                 $document.off('mousemove', mousemove);
//                 $document.off('mouseup', mouseup);
//             }

//             function mouseover(event) {
//                 scope.isActive = true;
//                 scope.$apply();
//             }

//             function mouseout(event) {
//                 scope.isActive = false;
//                 scope.$apply();
//             }

//             function touchstart(event) {
//                 var touch = getTouchEvent(event);
//                 $log.log('touchstart', touch);
//                 startX = touch.pageX - x;
//                 startY = touch.pageY - y;
//                 $document.on('touchmove', touchmove);
//                 $document.on('touchend', touchend);
//             }

//             function touchmove(event) {
//                 event.preventDefault();
//                 var touch = getTouchEvent(event);
//                 x = limitX(touch.pageX - startX);
//                 y = limitY(touch.pageY - startY);
//                 scrollY();
//                 scrollX();
//                 update();
//             }

//             function touchend(event) {
//                 $document.off('touchmove', touchmove);
//                 $document.off('touchend', touchend);
//                 $log.log('touchend.');
//             }

//             function getTouchEvent(event) {
//                 if (event.originalEvent != undefined) {
//                     event = event.originalEvent;
//                 }
//                 if (!event.touches) {
//                     return;
//                 }
//                 return event.touches[0]; //single touch
//             }

//             function moveX(distance) {
//                 x = limitX(x - distance);
//                 scrollX();
//             }

//             function moveY(distance) {
//                 y = limitY(y - distance);
//                 scrollY();
//             }

//             function scrollX() {
//                 var pos = {
//                     left: x + 'px'
//                 };
//                 top.css(pos);
//                 content.css(pos);
//             }

//             function scrollY() {
//                 var yOffset = y + scope.topOffset; //left header
//                 header.css({
//                     top: yOffset + 'px'
//                 });
//                 content.css({
//                     top: y + 'px'
//                 });
//             }

//             function limitX(value) {
//                 //value is negative
//                 var limit = maxX();
//                 return Math.min(0, Math.max(-limit, value));
//             }

//             function limitY(value) {
//                 var limit = maxY();
//                 return Math.min(0, Math.max(-limit, value));
//             }

//             function maxX() {
//                 var limit = actualWidth() - inner.width();
//                 return limit;
//             }

//             function maxY() {
//                 var viewHeight = element.height();
//                 var height = actualHeight();
//                 return height - viewHeight;
//             }

//             function actualHeight() {
//                 var h = child.height();
//                 return h + scope.topOffset;
//             }

//             function actualWidth() {
//                 var h = top.children().width();
//                 var w = child.width();
//                 return Math.max(h, w);
//             }

//             function getTopOffset() {
//                 return Math.max(top.children().height(), corner.height());
//             }

//             function getBarPositionX() {
//                 var viewWidth = inner.width();
//                 var barSize = scope.scrollX.width;
//                 var max = viewWidth - barSize;
//                 var xMax = maxX();
//                 var ratio = -x / xMax;
//                 return Math.floor(ratio * max);
//             }

//             function getBarPositionY() {
//                 var height = element.height();
//                 var barSize = scope.scrollY.height;
//                 var offset = scope.topOffset;
//                 var max = height - barSize - offset;
//                 var yMax = maxY();
//                 var ratio = -y / yMax;
//                 return Math.floor(ratio * max);
//             }

//             function getScrollWidth() {
//                 var w = inner.width(); //.xy-inner width
//                 var len = actualWidth();
//                 return w * w / len;
//             }

//             function getScrollHeight() {
//                 var h = element.height() - top.height();
//                 var len = actualHeight();
//                 return h * h / len;
//             }

//             function getRatioX() {
//                 var viewLength = inner.width();
//                 var actualLength = actualWidth();
//                 return actualLength / viewLength;
//             }

//             function getRatioY() {
//                 var viewLength = element.height() - top.height();
//                 var actualLength = actualHeight();
//                 return actualLength / viewLength;
//             }

//             function update() {
//                 scope.x = x;
//                 scope.y = y;
//                 scope.scrollX.left = getBarPositionX();
//                 scope.scrollY.top = getBarPositionY();
//                 scope.$apply();
//             }

//             /** acceleration effect on mouse wheel */
//             function accelerate() {
//                 if (accelerationTimer) {
//                     //keep moving state
//                     $timeout.cancel(accelerationTimer);
//                     if (accelerationDelay) {
//                         //keep acceleration
//                         $timeout.cancel(accelerationDelay);
//                     }
//                     accelerationDelay = $timeout(function () {
//                         speed += 0.1; //increase speed every 0.2s
//                     }, 200);
//                 }
//                 accelerationTimer = $timeout(function () {
//                     speed = 0.5;
//                 }, 400);

//                 return Math.min(speed, 1);
//             }

//         }
//     };

// }])



// <--

myApp.directive('includeReplace', includeReplace)
myApp.directive('a', preventClickDirective)
myApp.directive('a', bootstrapCollapseDirective)
myApp.directive('a', navigationDirective)
myApp.directive('button', layoutToggleDirective)
myApp.directive('a', layoutToggleDirective)
myApp.directive('button', collapseMenuTogglerDirective)
myApp.directive('div', bootstrapCarouselDirective)
myApp.directive('toggle', bootstrapTooltipsPopoversDirective)
myApp.directive('tab', bootstrapTabsDirective)
myApp.directive('button', cardCollapseDirective)

function includeReplace() {
    var directive = {
        require: 'ngInclude',
        restrict: 'A',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        element.replaceWith(element.children());
    }
}

//Prevent click if href="#"
function preventClickDirective() {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        if (attrs.href === '#') {
            element.on('click', function (event) {
                event.preventDefault();
            });
        }
    }
}

//Bootstrap Collapse
function bootstrapCollapseDirective() {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        if (attrs.toggle == 'collapse') {
            element.attr('href', 'javascript;;').attr('data-target', attrs.href.replace('index.html', ''));
        }
    }
}

/**
 * @desc Genesis main navigation - Siedebar menu
 * @example <li class="nav-item nav-dropdown"></li>
 */
function navigationDirective() {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        if (element.hasClass('nav-dropdown-toggle') && angular.element('body').width() > 782) {
            element.on('click', function () {
                if (!angular.element('body').hasClass('compact-nav')) {
                    element.parent().toggleClass('open').find('.open').removeClass('open');
                }
            });
        } else if (element.hasClass('nav-dropdown-toggle') && angular.element('body').width() < 783) {
            element.on('click', function () {
                element.parent().toggleClass('open').find('.open').removeClass('open');
            });
        }
    }
}

//Dynamic resize .sidebar-nav
sidebarNavDynamicResizeDirective.$inject = ['$window', '$timeout'];

function sidebarNavDynamicResizeDirective($window, $timeout) {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {

        if (element.hasClass('sidebar-nav') && angular.element('body').hasClass('fixed-nav')) {
            var bodyHeight = angular.element(window).height();
            scope.$watch(function () {
                var headerHeight = angular.element('header').outerHeight();

                if (angular.element('body').hasClass('sidebar-off-canvas')) {
                    element.css('height', bodyHeight);
                } else {
                    element.css('height', bodyHeight - headerHeight);
                }
            })

            angular.element($window).bind('resize', function () {
                var bodyHeight = angular.element(window).height();
                var headerHeight = angular.element('header').outerHeight();
                var sidebarHeaderHeight = angular.element('.sidebar-header').outerHeight();
                var sidebarFooterHeight = angular.element('.sidebar-footer').outerHeight();

                if (angular.element('body').hasClass('sidebar-off-canvas')) {
                    element.css('height', bodyHeight - sidebarHeaderHeight - sidebarFooterHeight);
                } else {
                    element.css('height', bodyHeight - headerHeight - sidebarHeaderHeight - sidebarFooterHeight);
                }
            });
        }
    }
}

//LayoutToggle
layoutToggleDirective.$inject = ['$interval'];

function layoutToggleDirective($interval) {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        element.on('click', function () {

            if (element.hasClass('sidebar-toggler')) {
                angular.element('body').toggleClass('sidebar-hidden');
            }

            if (element.hasClass('aside-menu-toggler')) {
                angular.element('body').toggleClass('aside-menu-hidden');
            }
        });
    }
}

//Collapse menu toggler
function collapseMenuTogglerDirective() {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        element.on('click', function () {
            if (element.hasClass('navbar-toggler') && !element.hasClass('layout-toggler')) {
                angular.element('body').toggleClass('sidebar-mobile-show')
            }
        })
    }
}

//Bootstrap Carousel
function bootstrapCarouselDirective() {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        if (attrs.ride == 'carousel') {
            element.find('a').each(function () {
                $(this).attr('data-target', $(this).attr('href').replace('index.html', '')).attr('href', 'javascript;;')
            });
        }
    }
}

//Bootstrap Tooltips & Popovers
function bootstrapTooltipsPopoversDirective() {
    var directive = {
        restrict: 'A',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        if (attrs.toggle == 'tooltip') {
            angular.element(element).tooltip();
        }
        if (attrs.toggle == 'popover') {
            angular.element(element).popover();
        }
    }
}

//Bootstrap Tabs
function bootstrapTabsDirective() {
    var directive = {
        restrict: 'A',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        element.click(function (e) {
            e.preventDefault();
            angular.element(element).tab('show');
        });
    }
}

//Card Collapse
function cardCollapseDirective() {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        if (attrs.toggle == 'collapse' && element.parent().hasClass('card-actions')) {

            if (element.parent().parent().parent().find('.card-body').hasClass('in')) {
                element.find('i').addClass('r180');
            }

            var id = 'collapse-' + Math.floor((Math.random() * 1000000000) + 1);
            element.attr('data-target', '#' + id)
            element.parent().parent().parent().find('.card-body').attr('id', id);

            element.on('click', function () {
                element.find('i').toggleClass('r180');
            })
        }
    }
}

