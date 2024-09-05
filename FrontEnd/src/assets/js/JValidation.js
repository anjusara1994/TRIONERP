

$(document).ready(function () {
    
    InitNumber();
    InitMaxLengthMobile();
    ValidateMobile();
    ValidateEmail();
    RestrictZero();
    OnlyAlphabets(); 
});

window.setInterval(function () {
    $('.NumberWithOneDot,.NumberOnly').each(function () {
        $(this).bind('mouseover', function () {
            $(this).attr('title', $(this).val());
        });
         
    });

}, 3000); 

function InitNumber() {

    $('.NumberWithOneDot,.AlphabetOnly,.AlphaNumericOnly,.AlphaNumericSpace').bind("cut paste drop", function (e) {
        e.preventDefault();
    });
    $('.NumberWithOneDot,.NumberOnly,.AlphabetOnly,.AlphaNumericOnly,.AlphaNumericSpace').attr("autocomplete", "off");

    $('.NumberOnly').on('input', function (event) {

        var charCode = event.which || this.value.substr(-1).charCodeAt(0);
        if ((charCode == 8 || charCode == 9 || charCode == 46 || charCode == 37 || charCode == 39) && charCode != 46) {
            return true;
        }

        var regex = new RegExp("^[0-9]+$");
        var key = this.value.substr(-1);
        if (!regex.test(key)) {
            this.value = this.value.substr(0, this.value.length - 1);
            return false;
        }

    });
    $('.NumberOnly').bind('change', function () {
        try {
            if (isNaN(this.value)) this.value = '';
            var n = parseFloat(this.value);
            var intval = Number(n) === n && n % 1 === 0;
            if (!intval) {
                this.value = '';
            }
        }
        catch (ex) {
            this.value = '';
        }
    });

    $('.NumberWithOneDot').on('input', function (event) {

        //var char= this.value.substr(-1);
        var charCode = event.which || this.value.substr(-1).charCodeAt(0);

        if (charCode == 46) {
            var countDot = $(this).val().split(".").length - 1;
            if (countDot > 1) {
                this.value = this.value.substr(0, this.value.length - 1);
                return false;
            }
        }
        if (charCode == 8 || charCode == 46) {
            return true
        }
        else {

            if (

                (charCode != 46 || $(this).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
                (charCode < 48 || charCode > 57)) {

                this.value = this.value.substr(0, this.value.length - 1);
                return false;
            }
        }
        return true;


    });
    $('.NumberWithOneDot').bind('change', function () {
        try {
            var n = parseFloat(this.value);
            var intval = Number(n) === n && n % 1 === 0;
            var floatval = Number(n) === n && n % 1 !== 0;
            if (!intval && !floatval) {
                this.value = '';
            }
        }
        catch (ex) {
            this.value = '';
        }
    });

    $('.AlphabetOnly').on('input', function (event) {

        var key = this.value.substr(-1);
        var regex = new RegExp("^[a-zA-Z]*$");
        if (!regex.test(key)) {
            this.value = this.value.substr(0, this.value.length - 1);
            return false;
        }

    });

    $('.AlphaNumericOnly').on('input', function (event) {

        var key = this.value.substr(-1);
        var regex = new RegExp("^[0-9a-zA-Z]+$");
        if (!regex.test(key)) {
            this.value = this.value.substr(0, this.value.length - 1);
            return false;
        }

    });

    $('.AlphaNumericSpace').on('input', function (event) {
        var key = this.value.substr(-1);
        var regex = /^[a-z\d\-_,\s]+$/i;
        if (!key.match(regex)) {
            this.value = this.value.substr(0, this.value.length - 1);
            return false;
        }

    });


}
function RemoveInvalidNo() {
    $('.NumberWithOneDot').each(function () {

        try {
            if (isNaN(this.value)) this.value = '';
            var n = parseFloat(this.value);
            var intval = Number(n) === n && n % 1 === 0;
            var floatval = Number(n) === n && n % 1 !== 0;
            if (!intval && !floatval) {
                this.value = '';
            }
        }
        catch (ex) {
            this.value = '';
        }
    });
    $('.NumberOnly').each(function () {

        try {
            if (isNaN(this.value)) this.value = '';
            var n = parseFloat(this.value);
            var intval = Number(n) === n && n % 1 === 0;

            if (!intval) {
                this.value = '';
            }
        }
        catch (ex) {
            this.value = '';
        }
    });
}

function ValidateMobile()
{
    $('.mobile').each(function ()
    {
        $(this).bind('change', function ()
        {
            var len = $(this).val().length
            if (len > 15) {
                ShowWarning('Mobile No is not valid');
                $(this).val('');
            }
        });
    });
}

function InitMaxLengthMobile() {
    //some mobile divice dose't support maxlength property this will help;
    var $input = $('input')
    var max = 0;
    $($input).each(function () {
        if ($(this).attr('MaxLength') != null) {
            max = $(this).attr('MaxLength');
            $(this).bind("drop", function (e) {
                e.preventDefault();
            });
            $(this).bind('keyup', function () {
                if ($(this).val().length > parseInt($(this).attr('MaxLength'))) {
                    $(this).val($(this).val().substr(0, parseInt($(this).attr('MaxLength'))));
                }
            });

        }
    });

}
function CheckEmail(email)
{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function ValidateEmail()
{
    $('.emailid').each(function () {
        $(this).bind('change', function ()
        {
            if (!CheckEmail($(this).val()))
            {
                if ($(this).val() != "")
                {
                    ShowWarning('Invalid email');
                }
                $(this).val("");
            }
        });
    });
}

function RestrictZero() {
    $('.restrictZero').keyup(function () {
        debugger
        var value = $(this).val();
        value = value.replace(/^(0*)/, "");
        value = value.replace(/[^0-1-2-3-4-5-6-7-8-9\s]/g, '');
        $(this).val(value);
    });
}

function OnlyAlphabets() {
    $('.onlyAlphabets').keyup(function () {
        var value = $(this).val();
        value = value.replace(/[^a-zA-Z\s]/g, '');
        $(this).val(value);
    });
}

function CheckNumeric(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46)
        return false;
    return true;
}


function CheckRequiredFieldUsingId(ID) {
    debugger
    $('#' + ID).each(function () {
        $(this).parent().removeClass('has-error');
        $('.parsley-errors-list').empty();
    });
    var chk = true;
    $('#' + ID).each(function () {
        if ($(this).prop('type') != null) {
            if ($(this).val() == "" || $(this).val() == null) {
                AddRequiredMessage(this);
                chk = false;
            }
        }
    });
    if (!chk) {
        ShowWarning('All (*) fields are mandatory');
    }
    return chk;
}
function checkDate(sender, args) {
    
    var limitdate = $("[id$=hidLimitdate]").val();
   // var aaaaa = new Date(limitdate).toUTCString();
    if (sender._selectedDate < new Date(Date.parse(limitdate)) || sender._selectedDate > new Date())
    {
        swal({ title: "Sorry!", text: "<b>You cannot select this date!</b>", html: true });
        sender._selectedDate = new Date();
        sender._textbox.set_Value(sender._selectedDate.format(sender._format))
    }
}
function GetCurrentDate()
{
    var m_names = new Array("Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec");
    debugger;
    var d = new Date();
    var curr_date = d.getDate();
    if (curr_date < 10) curr_date = '0' + curr_date;
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    return (curr_date + "-" + m_names[curr_month]+ "-" + curr_year);
}

function checkDateNew(ctrl) {
   
    var limitdate = $("[id$=hidLimitdate]").val();
    var SelectedDate = $(ctrl).val();
   
    if (new Date(Date.parse(SelectedDate)) < new Date(Date.parse(limitdate)) || new Date(Date.parse(SelectedDate)) > new Date()) {
        ShowWarning("You cannot select this date!");
        $(ctrl).val(GetCurrentDate());
    }
}
function lvEditDelete(dvListView, msg) {

    var isValid = true;
    if ($(".projectbox input[type=checkbox]:checked").length == 0) {
       
        swal({ title: "Warning!", text: "<b>"+msg+"</b>",html: true });

        isValid = false;
    }
    else if ($(".projectbox input[type=checkbox]:checked").length > 1) {
        
        swal({ title: "Warning!", text: "<b>Please select only one record!!</b>", html: true });

        isValid = false;
    }
    return isValid;
}
function onlyAlphabet(sID) {
    var myTextId = $(sID).attr("id");

    var sData = $("#" + myTextId).val();
    var sChar = sData.replace(/[^A-Za-z]/g, "");

    $("#" + myTextId).val(sChar)
}
function NumberWithOneDotMinus(sID) {
    var myTextId = $(sID).attr("id");

    var sData = $("#" + myTextId).val();
    var sChar = sData.replace(/[^0-9.-]/g, "");

    $("#" + myTextId).val(sChar)
}


function CheckIsAlphanumericInput(text) {
    var letter = /[a-zA-Z]/;
    var number = /[0-9]/;
    var valid = number.test(text) && letter.test(text); //match a letter _and_ a number
    return valid;
}



//clear session when user close browser
// put <body onclick="MasterClicked=true;" onunload="bodyUnload();">
var MasterClicked = false
function CheckBrowser()
{
   
    if (MasterClicked == false) {
        //Browser closed   
    } else {
        //redirected
        MasterClicked = false;
    }
}
function bodyUnload()
{
  
    //CheckBrowser();
    if (MasterClicked == false)//browser is closed  
    {
        var request = GetRequest();
        request.open("POST", "../Default.aspx", false);
        request.send();
    }
}

function GetRequest() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}
function Myconfirm(message, btnid) {
    bootbox.confirm({
        title: "<b>Are you sure?</b>",
        message: message,
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> Cancel'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Confirm'
            }
        },
        callback: function (result) {
            debugger
            if (result) {
                var elementType = $(btnid).prop('nodeName');
                if (elementType == 'A') {
                    eval($(btnid).attr('href'));
                }
                else {
                    $(btnid).removeAttr('onclick');
                    $(btnid).click();
                }

            }
        }
    });
}


function CheckOnlyOneList(args, cssclass)
{
    $('.' + cssclass + ' input').each(function () {

        $(this).attr('checked', false);
        $(this).closest('span').removeClass('checked');
    });

    $(args).find('input').attr('checked', true);
    $(args).find('input').closest('span').addClass('checked');
}

function CheckChange(args) {
    var isok = false;

    if ($(args).attr('checked')) {
        isok = true;
    }

    $('.chkselect input').each(function () {

        if (isok) {
            $(this).attr('checked', true);

            $(this).closest('span').addClass('checked');
            $(this).closest('tr').addClass('active');
        }
        else {
            $(this).attr('checked', false);

            $(this).closest('span').removeClass('checked');
            $(this).closest('tr').removeClass('active');
        }
    });


}

function CheckChangeAdvance(args) {
    //for TableAdvanceSearch
    //use onchange="CheckChangeAdvance(this) on header checkbox
    //and use Class="chkselectAdvance" on child checkbox
    var isok = false;

    if ($(args).attr('checked')) {

        isok = true;
    }

    if (!isok) {
        $(args).closest('span').removeClass('checked');
        $('.chkselectAdvance input').each(function () {
            $(this).attr('checked', false);
            $(this).closest('span').removeClass('checked');
            // $(this).closest('tr').removeClass('active');
        });
    }

    else if (isok) {
        $(args).closest('span').addClass('checked');
        $('.chkselectAdvance input').each(function () {
            if ($(this).closest('tr').is(':visible')) {
                $(this).attr('checked', true);
                $(this).closest('span').addClass('checked');
                // $(this).closest('tr').addClass('active');
            }

        });
    }

}

function CheckAtLeastOneSelect(cssclass) {
    var IsserverControl = false;
    $('.' + cssclass).each(function () {
        if ($(this).prop('type') == null) {
            IsserverControl = true;
        }
    });
    var isValid = true;

    if (IsserverControl)
    {
        if ($('.' + cssclass).find('input[type=checkbox]:checked').length == 0)
        {
            isValid = false;
            ShowWarning('Please select atleast one for action');
        }
       
    }
    else
    {
        if ($('input:checkbox.' + cssclass + ':checked').length == 0)
        {
            isValid = false;
            ShowWarning('Please select atleast one for action');
        }
        
    }

    return isValid;

}
function CheckOnlyOneSelect(cssclass) {
    var IsserverControl = false;
    $('.' + cssclass).each(function ()
    {
        if ($(this).prop('type') == null) {
            IsserverControl = true;
        }
    });
    var isValid = true;
    if (IsserverControl) {
        if ($('.' + cssclass).find('input[type=checkbox]:checked').length == 0) {
            isValid = false;
            ShowWarning('Please select only one for action');
        }
        else if ($('.' + cssclass).find('input[type=checkbox]:checked').length > 1) {
            isValid = false;
            ShowWarning('Please select only one for action');
        }
    }
    else
    {
        if ($('input:checkbox.' + cssclass + ':checked').length == 0) {
            isValid = false;
            ShowWarning('Please select one for action');
        }
        else if ($('input:checkbox.' + cssclass + ':checked').length > 1) {
            isValid = false;
            ShowWarning('Please select only one for action');
        }
    }
    return isValid;
}
function CheckDeclarationSelect(cssclass) {
    var IsserverControl = false;
    $('.' + cssclass).each(function ()
    {
        if ($(this).prop('type') == null) {
            IsserverControl = true;
        }
    });
    var isValid = true;
    if (IsserverControl) {
        if ($('.' + cssclass).find('input[type=checkbox]:checked').length == 0) {
            isValid = false;
            ShowWarning('Please select Declaration');
        }
        else if ($('.' + cssclass).find('input[type=checkbox]:checked').length > 1) {
            isValid = false;
            ShowWarning('Please select Declaration');
        }
    }
    else
    {
        if ($('input:checkbox.' + cssclass + ':checked').length == 0) {
            isValid = false;
            ShowWarning('Please select Declaration');
        }
        else if ($('input:checkbox.' + cssclass + ':checked').length > 1) {
            isValid = false;
            ShowWarning('Please select Declaration');
        }
    }
    return isValid;
}
function ClearRequiredField(CssClass) {
    $('.' + CssClass).each(function ()
    {
        $(this).parent().removeClass('has-error');
       
        if ($(this).prop('type') == 'select-one')
        {
            $(this).select2("val", "");
        }
        
        else
        {
            $(this).val("");
        }
    });

}

function CheckRequiredField(CssClass) {

    $('.' + CssClass).each(function () {
        $(this).parent().removeClass('has-error');
        $('.parsley-errors-list').empty();
    });
     
    var chk = true;

    $('.' + CssClass).each(function () {
        if ($(this).prop('type') != null) {
            if ($(this).val() == "" || $(this).val() == null)
            {
                AddRequiredMessage(this);
                chk = false;
            }
        }
        if ($(this).hasClass(CssClass) && $(this).is('p-dropdown')) {
            var dropdown = $(this);
            debugger
            // Adjust the selector based on the dropdown's internal structure
            var selectedValue = dropdown.find('.p-dropdown-label').text().trim(); // Example: might use label text

            if (selectedValue === "" || selectedValue === "Choose an Option") {
                AddRequiredMessage(this);
                chk = false;
            }
        }

    });

    if (!chk)
    {
        ShowWarning('All (*) fields are mandatory');
    }
    return chk;
}

function CheckRequiredFieldList(CheckBoxClass,ControlClass) {
    
    $('.' + ControlClass).each(function () {
        $(this).parent().removeClass('has-error');
        $('.parsley-errors-list').empty();
    });
    var isValid = true;
    $('.' + CheckBoxClass).each(function ()
    {
        if ($(this).closest('tr').find('input[type=checkbox]').attr('checked'))
        {
            $(this).closest('tr').find('.' + ControlClass).each(function () {

                if ($(this).prop('type') != null) {
                    if ($(this).val() == "") {
                        AddRequiredMessage(this);
                        isValid = false;
                    }
                }
            });
        }
    });
    if (!isValid)
    {
        ShowWarning('Please fill all requaried field<br/> for selected row');
    }
   
    return isValid;

}
function ValidateFileUploadonlypdf(args) {
    if (MasterUploadLimit(args) == false) {
        return;
    }
    var fuData = args;
    var FileUploadPath = fuData.value;
    var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
    if (Extension == "pdf") { }
    else {
        fuData.value = "";
        ShowWarning('Please upload PDF file only');
    }
}
function ValidateFileUpload(args) {
    if (MasterUploadLimit(args) == false) {
        return;
    }
    var fuData = args;
    var FileUploadPath = fuData.value;
    var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
    if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg" || Extension == "pdf" || Extension == "svg") { }
    else {
        fuData.value = "";
        ShowWarning('Please upload Image or PDF file only');

    }
}
function ValidateFileUploadOnlyImage(args) {
    if (MasterUploadLimit(args) == false) {
        return;
    }
    var fuData = args;
    var FileUploadPath = fuData.value;
    var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
    if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg") { }
    else {
        fuData.value = "";
        ShowWarning('Please upload Image Only');

    }
}
function ValidateFileUploadFinalReport(args) {
    if (MasterUploadLimit(args) == false) {
        return;
    }
    var fuData = args;
    var FileUploadPath = fuData.value;
    var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
    if (Extension == "pdf") { }
    else {
        fuData.value = "";
        ShowWarning('Please upload PDF file only');

    }
}
function ValidateFileUploadwithExcel(args) {
    if (MasterUploadLimit(args) == false) {
        return;
    }
    var fuData = args;
    var FileUploadPath = fuData.value;
    var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
    if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg" || Extension == "pdf" || Extension == "xlsx" || Extension == "xlsm" || Extension == "xlsb" || Extension == "xltx" || Extension == "xltm" || Extension == "xls" || Extension == "csv" || Extension == "zip" || Extension == "rar") { }
    else {
        fuData.value = "";
        ShowWarning('Please upload Image, PDF or Excel file only');

    }
}
function ValidateFileUploadwithExcelandWord(args) {
    if (MasterUploadLimit(args) == false) {
        return;
    }
    var fuData = args;
    var FileUploadPath = fuData.value;
    var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
    if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg" || Extension == "pdf" || Extension == "xlsx" || Extension == "xlsm" || Extension == "xlsb" || Extension == "xltx" || Extension == "xltm" || Extension == "xls" || Extension == "csv" || Extension == "zip" || Extension == "rar" || Extension == "docx") { }
    else {
        fuData.value = "";
        ShowWarning('Please upload Image, PDF or Excel file only');

    }
}
function ValidateFileUploadwithExcelandWordNoZip(args) {
    if (MasterUploadLimitFiveMB(args) == false) {
        return;
    }
    var fuData = args;
    var FileUploadPath = fuData.value;
    var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
    if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg" || Extension == "pdf" || Extension == "xlsx" || Extension == "xlsm" || Extension == "xlsb" || Extension == "xltx" || Extension == "xltm" || Extension == "xls" || Extension == "csv" || Extension == "docx") { }
    else {
        fuData.value = "";
        ShowWarning('Please upload Image, PDF or Excel file only');

    }
}
function ValidateFileUploadMail(args) {
    if (MasterUploadLimit(args) == false) {
        return;
    }
    var fuData = args;
    var FileUploadPath = fuData.value;
    var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
    if (Extension == "msg") { }
    else {
        fuData.value = "";
        ShowWarning('Please upload MSG file only');
    }
}
function ValidateFileUploadZip(args) {
    if (MasterUploadLimit(args) == false) {
        return;
    }
    var fuData = args;
    var FileUploadPath = fuData.value;
    var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
    if (Extension == "zip" || Extension == "rar") { }
    else {
        fuData.value = "";
        ShowWarning('Please upload zip file only');
    }
}
function MasterUploadLimit(args) {
    var chk = true;
    if ($(args).val() != "") {

        var fuData = args;
        var FileUploadPath = fuData.value;
        var Fsize = $(fuData)[0].files[0].size / 1024 / 1024
        if (parseFloat(Fsize) > 25) {
            fuData.value = "";
            ShowWarning('Maximum file size limit upto 25 MB.');
            chk = false;
        }
    }
    return chk;

}
function MasterUploadLimitFiveMB(args) {
    var chk = true;
    if ($(args).val() != "") {

        var fuData = args;
        var FileUploadPath = fuData.value;
        var Fsize = $(fuData)[0].files[0].size / 1024 / 1024
        if (parseFloat(Fsize) > 5) {
            fuData.value = "";
            ShowWarning('Maximum file size limit upto 5 MB.');
            chk = false;
        }
    }
    return chk;

}

function ValidateFileUploadSmall(args) {
    if (MasterUploadLimit1(args) == false) {
        return;
    }
    var fuData = args;
    var FileUploadPath = fuData.value;
    var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
    if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg" || Extension == "pdf") { }
    else {
        fuData.value = "";
        ShowWarning('Please upload Image or PDF file only');

    }
}

function MasterUploadLimit1(args) {
    var chk = true;
    if ($(args).val() != "") {

        var fuData = args;
        var FileUploadPath = fuData.value;
        var Fsize = $(fuData)[0].files[0].size / 1024 / 1024
        if (parseFloat(Fsize) > 1) {
            fuData.value = "";
            ShowWarning('Maximum file size limit upto 1 MB.');
            chk = false;
        }
    }
    return chk;

}

function FileUploadHandler(files, DirName) {
    var filepath = "";
    if (files == null) {
        return filepath;
    }


    try {
        var data = new FormData();

        if (files.length > 0) {
            data.append("UploadedFile", files[0]);
            data.append("DirName", DirName);
            var ajaxRequest = $.ajax({

                //url: "<%= ResolveUrl("~/")%>FileUploadHandler/FileUploadHandler.ashx",
                url: "" + baseUrl + "FileUploadHandler/FileUploadHandler.ashx",
                data: data,
                type: "POST",
                processData: false,
                async: false,
                contentType: false,
                success: function (r) {

                }
            });
            ajaxRequest.done(function (xhr, textStatus) {
                filepath = xhr;
            });
        }
    }
    catch (ex) {
        //console.log(ex);
    }

    return filepath;
}



function AddRequiredMessage(controlID) {
   debugger
    $(controlID).closest('div.form-group').addClass('has-error');
    $(controlID).parent().addClass('has-error');
    $(controlID).bind('change', function ()
    {
        $(controlID).parent().removeClass('has-error');
        $(controlID).closest('div.form-group').removeClass('has-error');
    });
}


function DownloadFileByByteArray(filename, byte) {
    var blob = new Blob([byte]);
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

function ConvertBase64StringToByteArray(Base64String) {
   
    var binaryString = window.atob(Base64String);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }

    return bytes;
}

function CheckRequiredFieldCheckboxRadio(CssClass) {
    $('.' + CssClass).each(function () {
        $(this).parent().removeClass('has-error');
        $('.parsley-errors-list').empty();
    });
    var chk = true;
    $('.' + CssClass).each(function () {
        var elementType = $(this).prop('type');
        if (elementType != null) {
            if (elementType === 'radio' || elementType === 'checkbox') {
                if (!$('[name="' + $(this).attr('name') + '"]:checked').length) {
                    AddRequiredMessage(this);
                    chk = false;
                }
            } else if ($(this).val() == "" || $(this).val() == null) {
                AddRequiredMessage(this);
                chk = false;
            }
        }
    });
    if (!chk) {
        ShowWarning('All (*) fields are mandatory');
    }
    return chk;
}