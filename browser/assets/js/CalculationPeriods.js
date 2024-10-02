$(function () {
   debugger
    $('.addBlurFromDate').on('change', function () {
        
        var optionValueDays = $("#ContentPlaceHolder1_ddlDaysFrom option:selected").val();
        var optionValueMonth = $("#ContentPlaceHolder1_ddlMonthsFrom option:selected").val();
        var optionValueYear = $("#ContentPlaceHolder1_ddlYearFrom option:selected").val();

        if (optionValueDays != "") {
            $("#ContentPlaceHolder1_txtPERIOD_from").val(optionValueDays);
        }
        if (optionValueMonth != "") {
            $("#ContentPlaceHolder1_txtPERIOD_from").val(optionValueDays + '-' + optionValueMonth); 
            if (optionValueDays == "") {
                $("#ContentPlaceHolder1_txtPERIOD_from").val(optionValueMonth);
            }
            else {
                $("#ContentPlaceHolder1_txtPERIOD_from").val(optionValueDays + '-' + optionValueMonth);
            }
        }
        if (optionValueYear != "") {
            $("#ContentPlaceHolder1_txtPERIOD_from").val(optionValueDays + '-' + optionValueMonth + '-' + optionValueYear);
            if (optionValueDays == "") {
                $("#ContentPlaceHolder1_txtPERIOD_from").val(optionValueMonth + '-' + optionValueYear);
            }
            if (optionValueMonth == "") {
                $("#ContentPlaceHolder1_txtPERIOD_from").val(optionValueYear);
            }
            if (optionValueDays == "" && optionValueMonth == "") {
                $("#ContentPlaceHolder1_txtPERIOD_from").val(optionValueYear);
            }
        }
        if (optionValueDays == "" && optionValueMonth == "" && optionValueYear == "") {
            $("#ContentPlaceHolder1_txtPERIOD_from").val("");
        }
    });
    //for Adding To date
    $('.addBlurToDate').on('change', function () {
        
        var optionValueDays = $("#ContentPlaceHolder1_ddlDaysTo option:selected").val();
        var optionValueMonth = $("#ContentPlaceHolder1_ddlMonthsTo option:selected").val();
        var optionValueYear = $("#ContentPlaceHolder1_ddlYearTo option:selected").val();

        if (optionValueDays != "") {
            $("#ContentPlaceHolder1_txtPERIOD_to").val(optionValueDays);
        }
        if (optionValueMonth != "") {
            $("#ContentPlaceHolder1_txtPERIOD_to").val(optionValueDays + '-' + optionValueMonth);
            if (optionValueDays == "") {
                $("#ContentPlaceHolder1_txtPERIOD_to").val(optionValueMonth);
            }
            else {
                $("#ContentPlaceHolder1_txtPERIOD_to").val(optionValueDays + '-' + optionValueMonth);
            }
        }
        if (optionValueYear != "") {
            $("#ContentPlaceHolder1_txtPERIOD_to").val(optionValueDays + '-' + optionValueMonth + '-' + optionValueYear);
            if (optionValueDays == "") {
                $("#ContentPlaceHolder1_txtPERIOD_to").val(optionValueMonth + '-' + optionValueYear);
            }
            if (optionValueMonth == "") {
                $("#ContentPlaceHolder1_txtPERIOD_to").val(optionValueYear);
            }
            if (optionValueDays == "" && optionValueMonth == "") {
                $("#ContentPlaceHolder1_txtPERIOD_to").val(optionValueYear);
            }
        }
        if (optionValueDays == "" && optionValueMonth == "" && optionValueYear == "") {
            $("#ContentPlaceHolder1_txtPERIOD_to").val("");
        }
    });

    //for Update To date
    $('.updateBlurFromDate').on('change', function () {
        
        var optionValueDays = $("#ContentPlaceHolder1_ddlDaysUpdateFr option:selected").val();
        var optionValueMonth = $("#ContentPlaceHolder1_ddlMonthsUpdateFr option:selected").val();
        var optionValueYear = $("#ContentPlaceHolder1_ddlYearUpdateFr option:selected").val();

        if (optionValueDays != "") {
            $("#ContentPlaceHolder1_txtPeriodFromUpdate").val(optionValueDays);
        }
        if (optionValueMonth != "") {
            $("#ContentPlaceHolder1_txtPeriodFromUpdate").val(optionValueDays + '-' + optionValueMonth);
            if (optionValueDays == "") {
                $("#ContentPlaceHolder1_txtPeriodFromUpdate").val(optionValueMonth);
            }
            else {
                $("#ContentPlaceHolder1_txtPeriodFromUpdate").val(optionValueDays + '-' + optionValueMonth);
            }
        }
        if (optionValueYear != "") {
            $("#ContentPlaceHolder1_txtPeriodFromUpdate").val(optionValueDays + '-' + optionValueMonth + '-' + optionValueYear);
            if (optionValueDays == "") {
                $("#ContentPlaceHolder1_txtPeriodFromUpdate").val(optionValueMonth + '-' + optionValueYear);
            }
            if (optionValueMonth == "") {
                $("#ContentPlaceHolder1_txtPeriodFromUpdate").val(optionValueYear);
            }
            if (optionValueDays == "" && optionValueMonth == "") {
                $("#ContentPlaceHolder1_txtPeriodFromUpdate").val(optionValueYear);
            }
        }
        if (optionValueDays == "" && optionValueMonth == "" && optionValueYear == "") {
            $("#ContentPlaceHolder1_txtPeriodFromUpdate").val("");
        }
    });

    //for Update To date
    $('.updateBlurToDate').on('change', function () {
        
        var optionValueDays = $("#ContentPlaceHolder1_ddlDaysUpdateTo option:selected").val();
        var optionValueMonth = $("#ContentPlaceHolder1_ddlMonthsUpdateTo option:selected").val();
        var optionValueYear = $("#ContentPlaceHolder1_ddlYearUpdateTo option:selected").val();

        if (optionValueDays != "") {
            $("#ContentPlaceHolder1_txtPeriodToUpdate").val(optionValueDays);
        }
        if (optionValueMonth != "") {
            $("#ContentPlaceHolder1_txtPeriodToUpdate").val(optionValueDays + '-' + optionValueMonth);
            if (optionValueDays == "") {
                $("#ContentPlaceHolder1_txtPeriodToUpdate").val(optionValueMonth);
            }
            else {
                $("#ContentPlaceHolder1_txtPeriodToUpdate").val(optionValueDays + '-' + optionValueMonth);
            }
        }
        if (optionValueYear != "") {
            $("#ContentPlaceHolder1_txtPeriodToUpdate").val(optionValueDays + '-' + optionValueMonth + '-' + optionValueYear);
            if (optionValueDays == "") {
                $("#ContentPlaceHolder1_txtPeriodToUpdate").val(optionValueMonth + '-' + optionValueYear);
            }
            if (optionValueMonth == "") {
                $("#ContentPlaceHolder1_txtPeriodToUpdate").val(optionValueYear);
            }
            if (optionValueDays == "" && optionValueMonth == "") {
                $("#ContentPlaceHolder1_txtPeriodToUpdate").val(optionValueYear);
            }
        }
        if (optionValueDays == "" && optionValueMonth == "" && optionValueYear == "") {
            $("#ContentPlaceHolder1_txtPeriodToUpdate").val("");
        }
    });
});


//For Fomating Date
function formatDate(dateF) {
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];

    var day = dateF.getDate();
    var monthIndex = dateF.getMonth();
    var year = dateF.getFullYear();
    return day + '-' + monthNames[monthIndex] + '-' + year;
}

//For Delete Row
function DeleteRow(args) {
    $(args).closest('tr').remove();
}

////////////////////////////////Add Period
function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    months += 1;
    return months <= 0 ? 0 : months;
}

//For Adding Periods
$(document).ready(function () {
    function calculation() {
 debugger
        //Calculate Total Amount
        var optionValue = $("#PeriodValue").val();
        var data = $("#ProfessionalFee").val();
        result = optionValue * data;
        $("#TotalAmount").val(result.toFixed(2));

        //Apply Discount on Total Amount
        var DiscountApplyS = $("#DiscountPercent").val();
        var AfterDiscount = (result * DiscountApplyS) / 100;
        $("#DiscountAmount").val(AfterDiscount.toFixed(2));
        var AfterApplyDiscount = parseFloat(result) - parseFloat(AfterDiscount);

        //Apply Commission on professional Amount
        // var CommissionP = $("#ContentPlaceHolder1_txtCommissionP").val();
        // var AfterCommission = (AfterApplyDiscount * CommissionP) / 100;
        // if (AfterCommission != "") {
        //     $("#ContentPlaceHolder1_txtCommission").val(AfterCommission.toFixed(2));
        // }

        //var actualAmount = AfterApplyDiscount - AfterCommission;
        var actualAmount = AfterApplyDiscount;
        $("#ActualAmount").val(actualAmount.toFixed(2));

        //Apply VAT
        var VATApply = $("#vatpercent").val();
        var AfterVATApply = (AfterApplyDiscount * VATApply) / 100;
        $("#vatamnt").val(AfterVATApply.toFixed(2));

         //Calculate with VAT Amount
         var AmountIncVAT = parseFloat(AfterApplyDiscount) + parseFloat(AfterVATApply);

        //Apply Authority Fee
        var authorityFee = 0;
        if ($("#AuthorityFee").val() != "") {
            authorityFee = $("#AuthorityFee").val();
        }
        var withAuthority = parseFloat(AmountIncVAT) + parseFloat(authorityFee);

        //After All Calculation 
        $("#Netamnt").val(withAuthority.toFixed(2));
        
        //Calculation Advance payment
        var optionPercentage = $("#Advancepercent").val();
        var AdvancePayment  = 0; 
        if (optionPercentage == '10') {
            AdvancePayment = (withAuthority.toFixed(2) * 10) / 100;
       }
       else if (optionPercentage == '5') {
        AdvancePayment = (withAuthority.toFixed(2) * 5) / 100;
   }
       else if (optionPercentage == '25') {
             AdvancePayment = (withAuthority.toFixed(2) * 25) / 100;
        }
        else if (optionPercentage == '50') {
             AdvancePayment = withAuthority.toFixed(2) / 2;
        }
        else if (optionPercentage == '75') {
             AdvancePayment = (withAuthority.toFixed(2) * 75) / 100;
        }
        else if (optionPercentage == '100') {
             AdvancePayment = withAuthority.toFixed(2) / 1;
        }
        $("#AdvanceAmnt").val(AdvancePayment.toFixed(2));
    };
    function calculateinPeriods() {
        debugger
        var amount5 = 0;
        if ($('#ProfessionalFee').val() != "") {
            amount5 = $('#ProfessionalFee').val();
        }
        var discountPercenatge = 0;
        if ($("#DiscountPercent").val() != "") {
            discountPercenatge = $('#DiscountPercent').val();
        }
        
        var calculateDiscount = (amount5 * discountPercenatge) / 100;

        var totalAfterDiscount = parseFloat(amount5) - parseFloat(calculateDiscount);


        var commissionP = 0;
        // if ($("#ContentPlaceHolder1_txtCommissionP").val() != "") {
        //     commissionP = $("#ContentPlaceHolder1_txtCommissionP").val();
        // }
        var calculatecommission = (totalAfterDiscount * commissionP) / 100;

        var totalActualAmount = parseFloat(totalAfterDiscount) - parseFloat(calculatecommission);

        var vatapply = $("#vatpercent").val();
        var vatAmount = (totalAfterDiscount * vatapply) / 100;

        var authorityFee = 0.00;
        if ($("#AuthorityFee").val() != "") {
            authorityFee = $("#AuthorityFee").val();
        }
        var withvattotalAmount = parseFloat(totalAfterDiscount) + parseFloat(vatAmount.toFixed(2)) + parseFloat(authorityFee);

        $('.amount').text(amount5);
        $('.discountPrcnt').text(discountPercenatge);
        $('.discountAmount').text(calculateDiscount);
        $('.commissionP').text(commissionP);
        $('.commissionAmount').text(calculatecommission);
        $('.ActualAmount').text(totalActualAmount);
        $('.vat').text(vatapply);
        $('.vatAmount').text(vatAmount.toFixed(2));
        $('.authorityFee').text(authorityFee);
        $('.withVATAmount').text(withvattotalAmount.toFixed(2));
    }
    function calculationBackLog() {
        debugger
        //Calculate Total Amount
        var optionValue = $("#ContentPlaceHolder1_txtPeriodValueBacklog").val();
        var data = $("#ContentPlaceHolder1_txtProfessionalFeeBacklog").val();
        result = optionValue * data;
        $("#ContentPlaceHolder1_txtTotalAmountBacklog").val(result.toFixed(2));

        //Apply Discount on Total Amount
        var DiscountApplyS = $("#ContentPlaceHolder1_txtDoscountPBacklog").val();
        var AfterDiscount = (result * DiscountApplyS) / 100;
        $("#ContentPlaceHolder1_txtDiscountBacklog").val(AfterDiscount.toFixed(2));
        var AfterApplyDiscount = parseFloat(result) - parseFloat(AfterDiscount);

        //Apply Commission on professional Amount
        var CommissionP = $("#ContentPlaceHolder1_txtCommissionPBacklog").val();
        var AfterCommission = (AfterApplyDiscount * CommissionP) / 100;
        if (AfterCommission != "") {
            $("#ContentPlaceHolder1_txtCommissionBacklog").val(AfterCommission.toFixed(2));
        }

        var actualAmount = AfterApplyDiscount - AfterCommission;
        $("#ContentPlaceHolder1_txtActualAmountBacklog").val(actualAmount.toFixed(2));

        //Apply VAT
        var VATApply = $("#ContentPlaceHolder1_ddlVATBacklog option:selected").val();
        var AfterVATApply = (AfterApplyDiscount * VATApply) / 100;
        $("#ContentPlaceHolder1_txtVATBacklog").val(AfterVATApply.toFixed(2));

        //Calculate with VAT Amount
        var AmountIncVAT = parseFloat(AfterApplyDiscount) + parseFloat(AfterVATApply);

        //Apply Authority Fee
        var authorityFee = 0;
        if ($("#ContentPlaceHolder1_txtAuthorityFeeBacklog").val() != "") {
            authorityFee = $("#ContentPlaceHolder1_txtAuthorityFeeBacklog").val();
        }
        var withAuthority = parseFloat(AmountIncVAT) + parseFloat(authorityFee);

        //After All Calculation 
        $("#ContentPlaceHolder1_txtAmountIncVATBacklog").val(withAuthority.toFixed(2));

        //Calculation Advance payment
        var optionPercentage = $("#ContentPlaceHolder1_ddlAdvancePerBacklog").val();

        if (optionPercentage == '25%') {
            var AdvancePayment = (withAuthority.toFixed(2) * 25) / 100;
        }
        else if (optionPercentage == '50%') {
            var AdvancePayment = withAuthority.toFixed(2) / 2;
        }
        else if (optionPercentage == '75%') {
            var AdvancePayment = (withAuthority.toFixed(2) * 75) / 100;
        }
        else if (optionPercentage == '100%') {
            var AdvancePayment = withAuthority.toFixed(2) / 1;
        }
        $("#ContentPlaceHolder1_txtAdvanceAmountBacklog").val(AdvancePayment.toFixed(2));
    };
    function calculateinPeriodsBacklog() {
        debugger
        var amount5 = 0;
        if ($('#ContentPlaceHolder1_txtProfessionalFeeBacklog').val() != "") {
            amount5 = $('#ContentPlaceHolder1_txtProfessionalFeeBacklog').val();
        }
        var discountPercenatge = 0;
        if ($("#ContentPlaceHolder1_txtDoscountPBacklog").val() != "") {
            discountPercenatge = $('#ContentPlaceHolder1_txtDoscountPBacklog').val();
        }

        var calculateDiscount = (amount5 * discountPercenatge) / 100;

        var totalAfterDiscount = parseFloat(amount5) - parseFloat(calculateDiscount);


        var commissionP = 0;
        if ($("#ContentPlaceHolder1_txtCommissionPBacklog").val() != "") {
            commissionP = $("#ContentPlaceHolder1_txtCommissionPBacklog").val();
        }
        var calculatecommission = (totalAfterDiscount * commissionP) / 100;

        var totalActualAmount = parseFloat(totalAfterDiscount) - parseFloat(calculatecommission);

        var vatapply = $("#ContentPlaceHolder1_ddlVATBacklog option:selected").val();
        var vatAmount = (totalAfterDiscount * vatapply) / 100;

        var authorityFee = 0.00;
        if ($("#ContentPlaceHolder1_txtAuthorityFeeBacklog").val() != "") {
            authorityFee = $("#ContentPlaceHolder1_txtAuthorityFeeBacklog").val();
        }
        var withvattotalAmount = parseFloat(totalAfterDiscount) + parseFloat(vatAmount.toFixed(2)) + parseFloat(authorityFee);

        $('.amount').text(amount5);
        $('.discountPrcnt').text(discountPercenatge);
        $('.discountAmount').text(calculateDiscount);
        $('.commissionP').text(commissionP);
        $('.commissionAmount').text(calculatecommission);
        $('.ActualAmount').text(totalActualAmount);
        $('.vat').text(vatapply);
        $('.vatAmount').text(vatAmount.toFixed(2));
        $('.authorityFee').text(authorityFee);
        $('.withVATAmount').text(withvattotalAmount.toFixed(2));
    }
    $('.advanceamount').on('keyup', function () {
        calculation();
        calculateinPeriods();
    });
    function calculateAu() {
        var rowCount = $('#tblPeriods tr').length;
        if (rowCount == 2) {
            debugger
            var authorityFee = 0.00;
            if ($("#ContentPlaceHolder1_txtEstimatedAuthorityFee").val() != "") {
                authorityFee = $("#ContentPlaceHolder1_txtEstimatedAuthorityFee").val();
            }
            var amount = $('.amount').text();
            var discountAmountP = 0.00;
            if ($("#ContentPlaceHolder1_txtEstimatedAuthorityFee").val() != "0.00") {
                discountAmountP = $("#ContentPlaceHolder1_txtDiscountAmtService").val();
            }
            var discountMinus = parseFloat(amount) - parseFloat(discountAmountP);
            var vatAmount = $('.vatAmount').text();
            $('.authorityFee').text(authorityFee);
            var withAuthority = parseFloat(discountMinus) + parseFloat(vatAmount) + parseFloat(authorityFee);
            $('.withVATAmount').text(withAuthority);
        }
        else {
            $("#ContentPlaceHolder1_txtEstimatedAuthorityFee").val("");
            return ShowWarning('Authority Fee will not add for multiple periods, please select One time in Type of Assignment');
        }
    }
    $('.calculateAuthority').on('keyup', function () {
        calculation();
        calculateAu();
    });
    $('.amountForAss').on('change', function () {
        calculation();
    });
    $('.vatforSelect').on('change', function () {
        calculation();
        calculateinPeriods();
    });
    $('.DirectDiscount').on('change', function () {
        var TotalAmount = $("#ContentPlaceHolder1_txtTOTAL_AMOUNT").val();
        var discount = $("#ContentPlaceHolder1_txtDiscountAmtService").val();
        var getDiscount = (discount * 100) / TotalAmount;
        $("#ContentPlaceHolder1_txtDiscountService").val(getDiscount);

        calculation();
        calculateinPeriods();

    });
    $('.calculatePer').on('change', function () {
        var TotalAmount = $("#ContentPlaceHolder1_txtTOTAL_AMOUNT").val();
        var discount = $("#ContentPlaceHolder1_txtDiscountAmtService").val();
        var discountAmount = TotalAmount - discount;
        var Commission = $("#ContentPlaceHolder1_txtCommission").val();
        debugger
        var calculatePerc = (Commission * 100) / discountAmount;
        $("#ContentPlaceHolder1_txtCommissionP").val(calculatePerc);

        calculation();
        calculateinPeriods();

    });
    $('#ContentPlaceHolder1_txtCommissionP').on('keyup', function () {
        debugger
        var value = $("#ContentPlaceHolder1_txtCommissionP").val();
        if (value <= 100) {
            calculation();
            calculateinPeriods();
        }
        else {
            $("#ContentPlaceHolder1_txtCommissionP").val("");
            return ShowWarning('Not Supported');
        }
    });
    $('#ContentPlaceHolder1_txtDiscountService').on('keyup', function () {
        debugger
        var value = $("#ContentPlaceHolder1_txtDiscountService").val();
        if (value <= 100) {
            calculation();
            calculateinPeriods();
        }
        else {
            $("#ContentPlaceHolder1_txtDiscountService").val("");
            return ShowWarning('Not Supported');
        }
    });
    $('.advanceamount1').on('change', function () {
        calculation();
    });

    //function firstOfNextMonth(i) {
    //    debugger 
    //    var d = i;
    //    d.setMonth(d.getDate() + 10);
    //    return d;
    //}
    //For Adding Date
    $("#ddlTYPE_OF_ASSIGNMENT").on('change', function () {
        debugger
        var period = $("#ddlTYPE_OF_ASSIGNMENT").val();
        fromdate = new Date($("#StartDate").val());
        todate = new Date($("#EndDate").val());
        var monthCal = monthDiff(fromdate, todate);
        var halfyearly = 6;
        var quarterly = 3;
        var monthly = 12;

        if (period != "") {
            $('#tblPeriods tbody tr').remove();
            if (period == "4") { //Yearly

                if (monthCal < 12 || monthCal > 120) {
                    return ShowWarning('If your selection is yearly then you can select only 1 year Date');
                }
                else {

                    var devideValue = monthCal / 12;
                    var firstTextboxValue = $("#ContentPlaceHolder1_txtPERIOD_from").val();
                    $("#ContentPlaceHolder1_txtMonthValue").val(devideValue);
                    const firstdate = new Date(firstTextboxValue);
                    const seconddate = new Date(firstdate);
                    const duedate = new Date(firstdate);
                    const Amcaduedate = new Date(firstdate);
                    seconddate.setDate(firstdate.getDate());
                    duedate.setDate(firstdate.getDate());
                    Amcaduedate.setDate(firstdate.getDate());

                    for (dateCount = 0; dateCount < devideValue; dateCount++) {
                        const seconddate1 = new Date(seconddate.setMonth(firstdate.getMonth() + 12));
                        const duedate1 = new Date(duedate.setMonth(firstdate.getMonth() + 12));
                        const Amcaduedate1 = new Date(Amcaduedate.setMonth(firstdate.getMonth() + 12));
                        seconddate1.setDate(seconddate1.getDate() - 1);
                        duedate1.setDate(duedate1.getDate() + 9);
                        Amcaduedate1.setDate(Amcaduedate1.getDate() + 6);

                        var row1 = "<tr>";

                        row1 += "<td class='clsdata'>" + formatDate(firstdate) + "</td>";
                        row1 += "<td class='clsdata1'>" + formatDate(seconddate1) + "</td>";
                        row1 += "<td class='amcaduedate'>" + formatDate(Amcaduedate1) + "</td>";
                        row1 += "<td class='serviceduedate'>" + formatDate(duedate1) + "</td>";
                        row1 += "<td class='amount'></td>";
                        row1 += "<td class='discountPrcnt'></td>";
                        row1 += "<td class='discountAmount'></td>";
                        row1 += "<td class='commissionP'></td>";
                        row1 += "<td class='commissionAmount'></td>";
                        row1 += "<td class='ActualAmount'></td>";
                        row1 += "<td class='vat'></td>";
                        row1 += "<td class='vatAmount'></td>";
                        row1 += "<td class='authorityFee'></td>";
                        row1 += "<td class='withVATAmount'></td>";
                        //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                        row1 += "</tr>";

                        firstdate.setMonth(firstdate.getMonth() + 12);

                        $('#tblPeriods tbody').append(row1);
                    }
                }
            }

            else if (period == "3") { //Half Yearly
                var devideValue = monthCal / halfyearly;
                var firstTextboxValue = $("#ContentPlaceHolder1_txtPERIOD_from").val();
                $("#ContentPlaceHolder1_txtMonthValue").val(devideValue);
                const firstdate = new Date(firstTextboxValue);
                const seconddate = new Date(firstdate);
                const duedate = new Date(firstdate);
                const Amcaduedate = new Date(firstdate);
                seconddate.setDate(firstdate.getDate());
                duedate.setDate(firstdate.getDate());
                Amcaduedate.setDate(firstdate.getDate());

                for (dateCount = 0; dateCount < devideValue; dateCount++) {
                    const seconddate1 = new Date(seconddate.setMonth(firstdate.getMonth() + parseInt(halfyearly)));
                    const duedate1 = new Date(duedate.setMonth(firstdate.getMonth() + parseInt(halfyearly)));
                    const Amcaduedate1 = new Date(Amcaduedate.setMonth(firstdate.getMonth() + parseInt(halfyearly)));
                    seconddate1.setDate(seconddate1.getDate() - 1);
                    duedate1.setDate(duedate1.getDate() + 9);
                    Amcaduedate1.setDate(Amcaduedate1.getDate() + 6);

                    var row1 = "<tr>";

                    row1 += "<td class='clsdata'>" + formatDate(firstdate) + "</td>";
                    row1 += "<td class='clsdata1'>" + formatDate(seconddate1) + "</td>";
                    row1 += "<td class='amcaduedate'>" + formatDate(Amcaduedate1) + "</td>";
                    row1 += "<td class='serviceduedate'>" + formatDate(duedate1) + "</td>";

                    row1 += "<td class='amount'></td>";
                    row1 += "<td class='discountPrcnt'></td>";
                    row1 += "<td class='discountAmount'></td>";
                    row1 += "<td class='commissionP'></td>";
                    row1 += "<td class='commissionAmount'></td>";
                    row1 += "<td class='ActualAmount'></td>";
                    row1 += "<td class='vat'></td>";
                    row1 += "<td class='vatAmount'></td>";
                    row1 += "<td class='authorityFee'></td>";
                    row1 += "<td class='withVATAmount'></td>";
                    //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                    row1 += "</tr>";

                    firstdate.setMonth(firstdate.getMonth() + parseInt(halfyearly));

                    $('#tblPeriods tbody').append(row1);
                }
            }
            else if (period == "1") { //Monhtly
                var devideValue = monthCal;
                var addMonth = monthCal / monthly;
                $("#ContentPlaceHolder1_txtMonthValue").val(devideValue);
                var firstTextboxValue = $("#ContentPlaceHolder1_txtPERIOD_from").val();
                const firstdate = new Date(firstTextboxValue);
                const seconddate = new Date(firstdate);
                const duedate = new Date(firstdate);
                const Amcaduedate = new Date(firstdate);
                seconddate.setDate(firstdate.getDate());
                duedate.setDate(firstdate.getDate());
                Amcaduedate.setDate(firstdate.getDate());

                for (dateCount = 0; dateCount < devideValue; dateCount++) {
                    const seconddate1 = new Date(seconddate.setMonth(firstdate.getMonth() + parseInt(1)));
                    const duedate1 = new Date(duedate.setMonth(firstdate.getMonth() + parseInt(1)));
                    const Amcaduedate1 = new Date(Amcaduedate.setMonth(firstdate.getMonth() + parseInt(1)));
                    seconddate1.setDate(seconddate1.getDate() - 1);
                    duedate1.setDate(duedate1.getDate() + 9);
                    Amcaduedate1.setDate(Amcaduedate1.getDate() + 6);

                    var row1 = "<tr>";

                    row1 += "<td class='clsdata'>" + formatDate(firstdate) + "</td>";
                    row1 += "<td class='clsdata1'>" + formatDate(seconddate1) + "</td>";
                    row1 += "<td class='amcaduedate'>" + formatDate(Amcaduedate1) + "</td>";
                    row1 += "<td class='serviceduedate'>" + formatDate(duedate1) + "</td>";

                    row1 += "<td class='amount'></td>";
                    row1 += "<td class='discountPrcnt'></td>";
                    row1 += "<td class='discountAmount'></td>";
                    row1 += "<td class='commissionP'></td>";
                    row1 += "<td class='commissionAmount'></td>";
                    row1 += "<td class='ActualAmount'></td>";
                    row1 += "<td class='vat'></td>";
                    row1 += "<td class='vatAmount'></td>";
                    row1 += "<td class='authorityFee'></td>";
                    row1 += "<td class='withVATAmount'></td>";
                    //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                    row1 += "</tr>";

                    firstdate.setMonth(firstdate.getMonth() + parseInt(1));

                    $('#tblPeriods tbody').append(row1);
                }
            }
            else if (period == "2") { //Quarterly
                var devideValue = monthCal / quarterly;
                var firstTextboxValue = $("#ContentPlaceHolder1_txtPERIOD_from").val();
                $("#ContentPlaceHolder1_txtMonthValue").val(devideValue);
                const firstdate = new Date(firstTextboxValue);
                const seconddate = new Date(firstdate);
                const duedate = new Date(firstdate);
                const Amcaduedate = new Date(firstdate);
                seconddate.setDate(firstdate.getDate());
                duedate.setDate(firstdate.getDate());
                Amcaduedate.setDate(firstdate.getDate());

                for (dateCount = 0; dateCount < devideValue; dateCount++) {
                    const seconddate1 = new Date(seconddate.setMonth(firstdate.getMonth() + parseInt(quarterly)));
                    const duedate1 = new Date(duedate.setMonth(firstdate.getMonth() + parseInt(quarterly)));
                    const Amcaduedate1 = new Date(Amcaduedate.setMonth(firstdate.getMonth() + parseInt(quarterly)));
                    seconddate1.setDate(seconddate1.getDate() - 1);
                    duedate1.setDate(duedate1.getDate() + 27);
                    Amcaduedate1.setDate(Amcaduedate1.getDate() + 24);
                    debugger

                    var row1 = "<tr>";

                    row1 += "<td class='clsdata'>" + formatDate(firstdate) + "</td>";
                    row1 += "<td class='clsdata1'>" + formatDate(seconddate1) + "</td>";
                    row1 += "<td class='amcaduedate'>" + formatDate(Amcaduedate1) + "</td>";
                    row1 += "<td class='serviceduedate'>" + formatDate(duedate1) + "</td>";

                    row1 += "<td class='amount'></td>";
                    row1 += "<td class='discountPrcnt'></td>";
                    row1 += "<td class='discountAmount'></td>";
                    row1 += "<td class='commissionP'></td>";
                    row1 += "<td class='commissionAmount'></td>";
                    row1 += "<td class='ActualAmount'></td>";
                    row1 += "<td class='vat'></td>";
                    row1 += "<td class='vatAmount'></td>";
                    row1 += "<td class='authorityFee'></td>";
                    row1 += "<td class='withVATAmount'></td>";
                    //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                    row1 += "</tr>";

                    firstdate.setMonth(firstdate.getMonth() + parseInt(quarterly));

                    $('#tblPeriods tbody').append(row1);
                }
            }
            else if (period == "6") { //One time
                devideValue = 1;
                var row1 = "<tr>";
                row1 += "<td class='clsdata'>" + $("#ContentPlaceHolder1_txtPERIOD_from").val() + "</td>";
                row1 += "<td class='clsdata1'>" + $("#ContentPlaceHolder1_txtPERIOD_to").val() + "</td>";
                row1 += "<td class='amcaduedate'>" + $("#ContentPlaceHolder1_txtPERIOD_to").val() + "</td>";
                row1 += "<td class='serviceduedate'>" + $("#ContentPlaceHolder1_txtPERIOD_to").val() + "</td>";

                row1 += "<td class='amount'></td>";
                row1 += "<td class='discountPrcnt'></td>";
                row1 += "<td class='discountAmount'></td>";
                row1 += "<td class='commissionP'></td>";
                row1 += "<td class='commissionAmount'></td>";
                row1 += "<td class='ActualAmount'></td>";
                row1 += "<td class='vat'></td>";
                row1 += "<td class='vatAmount'></td>";
                row1 += "<td class='authorityFee'></td>";
                row1 += "<td class='withVATAmount'></td>";
                //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                row1 += "</tr>";

                $('#tblPeriods tbody').append(row1);
                $("#ContentPlaceHolder1_txtMonthValue").val(devideValue);
            }
            else if (period == "5") { //Annually
                devideValue = 1;

                var row1 = "<tr>";
                row1 += "<td class='clsdata'>" + $("#ContentPlaceHolder1_txtPERIOD_from").val() + "</td>";
                row1 += "<td class='clsdata1'>" + $("#ContentPlaceHolder1_txtPERIOD_to").val() + "</td>";
                row1 += "<td class='amcaduedate'>" + $("#ContentPlaceHolder1_txtPERIOD_to").val() + "</td>";
                row1 += "<td class='serviceduedate'>" + $("#ContentPlaceHolder1_txtPERIOD_to").val() + "</td>";

                row1 += "<td class='amount'></td>";
                row1 += "<td class='discountPrcnt'></td>";
                row1 += "<td class='discountAmount'></td>";
                row1 += "<td class='commissionP'></td>";
                row1 += "<td class='commissionAmount'></td>";
                row1 += "<td class='ActualAmount'></td>";
                row1 += "<td class='vat'></td>";
                row1 += "<td class='vatAmount'></td>";
                row1 += "<td class='authorityFee'></td>";
                row1 += "<td class='withVATAmount'></td>";
                //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                row1 += "</tr>";

                $('#tblPeriods tbody').append(row1);
                $("#ContentPlaceHolder1_txtMonthValue").val(devideValue);
            }
            calculation();
            calculateinPeriods();
        }

        else {
            return ShowWarning('Period is Mendatory');
        }
    });
    $("#ContentPlaceHolder1_ddlAssignmentTypeBacklog").on('change', function () {
        var period = $("#ContentPlaceHolder1_ddlAssignmentTypeBacklog option:selected").val();
        fromdate = new Date($("#ContentPlaceHolder1_txtPeriodFromBacklog").val());
        todate = new Date($("#ContentPlaceHolder1_txtPeriodToBacklog").val());
        var monthCal = monthDiff(fromdate, todate);
        var halfyearly = 6;
        var quarterly = 3;
        var monthly = 12;

        if (period != "") {
            $('#tblPeriodsBacklogs tbody tr').remove();
            if (period == "4") {

                if (monthCal < 12 || monthCal > 120) {
                    return ShowWarning('If your selection is yearly then you can select only 1 year Date');
                }
                else {

                    var devideValue = monthCal / 12;
                    var firstTextboxValue = $("#ContentPlaceHolder1_txtPeriodFromBacklog").val();
                    $("#ContentPlaceHolder1_txtPeriodValueBacklog").val(devideValue);
                    const firstdate = new Date(firstTextboxValue);
                    const seconddate = new Date(firstdate);
                    const duedate = new Date(firstdate);
                    const Amcaduedate = new Date(firstdate);
                    seconddate.setDate(firstdate.getDate());
                    duedate.setDate(firstdate.getDate());
                    Amcaduedate.setDate(firstdate.getDate());

                    for (dateCount = 0; dateCount < devideValue; dateCount++) {
                        const seconddate1 = new Date(seconddate.setMonth(firstdate.getMonth() + 12));
                        const duedate1 = new Date(duedate.setMonth(firstdate.getMonth() + 12));
                        const Amcaduedate1 = new Date(Amcaduedate.setMonth(firstdate.getMonth() + 12));
                        seconddate1.setDate(seconddate1.getDate() - 1);
                        duedate1.setDate(duedate1.getDate() + 9);
                        Amcaduedate1.setDate(Amcaduedate1.getDate() + 6);

                        var row1 = "<tr>";

                        row1 += "<td class='clsdata'>" + formatDate(firstdate) + "</td>";
                        row1 += "<td class='clsdata1'>" + formatDate(seconddate1) + "</td>";
                        row1 += "<td class='amcaduedate'>" + formatDate(Amcaduedate1) + "</td>";
                        row1 += "<td class='serviceduedate'>" + formatDate(duedate1) + "</td>";
                        row1 += "<td class='amount'></td>";
                        row1 += "<td class='discountPrcnt'></td>";
                        row1 += "<td class='discountAmount'></td>";
                        row1 += "<td class='commissionP'></td>";
                        row1 += "<td class='commissionAmount'></td>";
                        row1 += "<td class='ActualAmount'></td>";
                        row1 += "<td class='vat'></td>";
                        row1 += "<td class='vatAmount'></td>";
                        row1 += "<td class='authorityFee'></td>";
                        row1 += "<td class='withVATAmount'></td>";
                        //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                        row1 += "</tr>";

                        firstdate.setMonth(firstdate.getMonth() + 12);

                        $('#tblPeriodsBacklogs tbody').append(row1);
                    }
                }
            }

            else if (period == "3") {
                var devideValue = monthCal / halfyearly;
                var firstTextboxValue = $("#ContentPlaceHolder1_txtPeriodFromBacklog").val();
                $("#ContentPlaceHolder1_txtPeriodValueBacklog").val(devideValue);
                const firstdate = new Date(firstTextboxValue);
                const seconddate = new Date(firstdate);
                const duedate = new Date(firstdate);
                const Amcaduedate = new Date(firstdate);
                seconddate.setDate(firstdate.getDate());
                duedate.setDate(firstdate.getDate());
                Amcaduedate.setDate(firstdate.getDate());

                for (dateCount = 0; dateCount < devideValue; dateCount++) {
                    const seconddate1 = new Date(seconddate.setMonth(firstdate.getMonth() + parseInt(halfyearly)));
                    const duedate1 = new Date(duedate.setMonth(firstdate.getMonth() + parseInt(halfyearly)));
                    const Amcaduedate1 = new Date(Amcaduedate.setMonth(firstdate.getMonth() + parseInt(halfyearly)));
                    seconddate1.setDate(seconddate1.getDate() - 1);
                    duedate1.setDate(duedate1.getDate() + 9);
                    Amcaduedate1.setDate(Amcaduedate1.getDate() + 6);

                    var row1 = "<tr>";

                    row1 += "<td class='clsdata'>" + formatDate(firstdate) + "</td>";
                    row1 += "<td class='clsdata1'>" + formatDate(seconddate1) + "</td>";
                    row1 += "<td class='amcaduedate'>" + formatDate(Amcaduedate1) + "</td>";
                    row1 += "<td class='serviceduedate'>" + formatDate(duedate1) + "</td>";

                    row1 += "<td class='amount'></td>";
                    row1 += "<td class='discountPrcnt'></td>";
                    row1 += "<td class='discountAmount'></td>";
                    row1 += "<td class='commissionP'></td>";
                    row1 += "<td class='commissionAmount'></td>";
                    row1 += "<td class='ActualAmount'></td>";
                    row1 += "<td class='vat'></td>";
                    row1 += "<td class='vatAmount'></td>";
                    row1 += "<td class='authorityFee'></td>";
                    row1 += "<td class='withVATAmount'></td>";
                    //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                    row1 += "</tr>";

                    firstdate.setMonth(firstdate.getMonth() + parseInt(halfyearly));

                    $('#tblPeriodsBacklogs tbody').append(row1);
                }
            }
            else if (period == "1") {
                var devideValue = monthCal;
                var addMonth = monthCal / monthly;
                $("#ContentPlaceHolder1_txtPeriodValueBacklog").val(devideValue);
                var firstTextboxValue = $("#ContentPlaceHolder1_txtPeriodFromBacklog").val();
                const firstdate = new Date(firstTextboxValue);
                const seconddate = new Date(firstdate);
                const duedate = new Date(firstdate);
                const Amcaduedate = new Date(firstdate);
                seconddate.setDate(firstdate.getDate());
                duedate.setDate(firstdate.getDate());
                Amcaduedate.setDate(firstdate.getDate());

                for (dateCount = 0; dateCount < devideValue; dateCount++) {
                    const seconddate1 = new Date(seconddate.setMonth(firstdate.getMonth() + parseInt(1)));
                    const duedate1 = new Date(duedate.setMonth(firstdate.getMonth() + parseInt(1)));
                    const Amcaduedate1 = new Date(Amcaduedate.setMonth(firstdate.getMonth() + parseInt(1)));
                    seconddate1.setDate(seconddate1.getDate() - 1);
                    duedate1.setDate(duedate1.getDate() + 9);
                    Amcaduedate1.setDate(Amcaduedate1.getDate() + 6);

                    var row1 = "<tr>";

                    row1 += "<td class='clsdata'>" + formatDate(firstdate) + "</td>";
                    row1 += "<td class='clsdata1'>" + formatDate(seconddate1) + "</td>";
                    row1 += "<td class='amcaduedate'>" + formatDate(Amcaduedate1) + "</td>";
                    row1 += "<td class='serviceduedate'>" + formatDate(duedate1) + "</td>";

                    row1 += "<td class='amount'></td>";
                    row1 += "<td class='discountPrcnt'></td>";
                    row1 += "<td class='discountAmount'></td>";
                    row1 += "<td class='commissionP'></td>";
                    row1 += "<td class='commissionAmount'></td>";
                    row1 += "<td class='ActualAmount'></td>";
                    row1 += "<td class='vat'></td>";
                    row1 += "<td class='vatAmount'></td>";
                    row1 += "<td class='authorityFee'></td>";
                    row1 += "<td class='withVATAmount'></td>";
                    //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                    row1 += "</tr>";

                    firstdate.setMonth(firstdate.getMonth() + parseInt(1));

                    $('#tblPeriodsBacklogs tbody').append(row1);
                }
            }
            else if (period == "2") {
                var devideValue = monthCal / quarterly;
                var firstTextboxValue = $("#ContentPlaceHolder1_txtPeriodFromBacklog").val();
                $("#ContentPlaceHolder1_txtPeriodValueBacklog").val(devideValue);
                const firstdate = new Date(firstTextboxValue);
                const seconddate = new Date(firstdate);
                const duedate = new Date(firstdate);
                const Amcaduedate = new Date(firstdate);
                seconddate.setDate(firstdate.getDate());
                duedate.setDate(firstdate.getDate());
                Amcaduedate.setDate(firstdate.getDate());

                for (dateCount = 0; dateCount < devideValue; dateCount++) {
                    const seconddate1 = new Date(seconddate.setMonth(firstdate.getMonth() + parseInt(quarterly)));
                    const duedate1 = new Date(duedate.setMonth(firstdate.getMonth() + parseInt(quarterly)));
                    const Amcaduedate1 = new Date(Amcaduedate.setMonth(firstdate.getMonth() + parseInt(quarterly)));
                    seconddate1.setDate(seconddate1.getDate() - 1);
                    duedate1.setDate(duedate1.getDate() + 27);
                    Amcaduedate1.setDate(Amcaduedate1.getDate() + 24);
                    debugger

                    var row1 = "<tr>";

                    row1 += "<td class='clsdata'>" + formatDate(firstdate) + "</td>";
                    row1 += "<td class='clsdata1'>" + formatDate(seconddate1) + "</td>";
                    row1 += "<td class='amcaduedate'>" + formatDate(Amcaduedate1) + "</td>";
                    row1 += "<td class='serviceduedate'>" + formatDate(duedate1) + "</td>";

                    row1 += "<td class='amount'></td>";
                    row1 += "<td class='discountPrcnt'></td>";
                    row1 += "<td class='discountAmount'></td>";
                    row1 += "<td class='commissionP'></td>";
                    row1 += "<td class='commissionAmount'></td>";
                    row1 += "<td class='ActualAmount'></td>";
                    row1 += "<td class='vat'></td>";
                    row1 += "<td class='vatAmount'></td>";
                    row1 += "<td class='authorityFee'></td>";
                    row1 += "<td class='withVATAmount'></td>";
                    //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                    row1 += "</tr>";

                    firstdate.setMonth(firstdate.getMonth() + parseInt(quarterly));

                    $('#tblPeriodsBacklogs tbody').append(row1);
                }
            }
            else if (period == "6") {
                devideValue = 1;
                var row1 = "<tr>";
                row1 += "<td class='clsdata'>" + $("#ContentPlaceHolder1_txtPeriodFromBacklog").val() + "</td>";
                row1 += "<td class='clsdata1'>" + $("#ContentPlaceHolder1_txtPeriodToBacklog").val() + "</td>";
                row1 += "<td class='amcaduedate'>" + $("#ContentPlaceHolder1_txtPeriodToBacklog").val() + "</td>";
                row1 += "<td class='serviceduedate'>" + $("#ContentPlaceHolder1_txtPeriodToBacklog").val() + "</td>";

                row1 += "<td class='amount'></td>";
                row1 += "<td class='discountPrcnt'></td>";
                row1 += "<td class='discountAmount'></td>";
                row1 += "<td class='commissionP'></td>";
                row1 += "<td class='commissionAmount'></td>";
                row1 += "<td class='ActualAmount'></td>";
                row1 += "<td class='vat'></td>";
                row1 += "<td class='vatAmount'></td>";
                row1 += "<td class='authorityFee'></td>";
                row1 += "<td class='withVATAmount'></td>";
                //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                row1 += "</tr>";

                $('#tblPeriodsBacklogs tbody').append(row1);
                $("#ContentPlaceHolder1_txtPeriodValueBacklog").val(devideValue);
            }
            else if (period == "5") {
                devideValue = 1;

                var row1 = "<tr>";
                row1 += "<td class='clsdata'>" + $("#ContentPlaceHolder1_txtPeriodFromBacklog").val() + "</td>";
                row1 += "<td class='clsdata1'>" + $("#ContentPlaceHolder1_txtPeriodToBacklog").val() + "</td>";
                row1 += "<td class='amcaduedate'>" + $("#ContentPlaceHolder1_txtPeriodToBacklog").val() + "</td>";
                row1 += "<td class='serviceduedate'>" + $("#ContentPlaceHolder1_txtPeriodToBacklog").val() + "</td>";

                row1 += "<td class='amount'></td>";
                row1 += "<td class='discountPrcnt'></td>";
                row1 += "<td class='discountAmount'></td>";
                row1 += "<td class='commissionP'></td>";
                row1 += "<td class='commissionAmount'></td>";
                row1 += "<td class='ActualAmount'></td>";
                row1 += "<td class='vat'></td>";
                row1 += "<td class='vatAmount'></td>";
                row1 += "<td class='authorityFee'></td>";
                row1 += "<td class='withVATAmount'></td>";
                //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                row1 += "</tr>";

                $('#tblPeriodsBacklogs tbody').append(row1);
                $("#ContentPlaceHolder1_txtPeriodValueBacklog").val(devideValue);
            }
            calculationBackLog();
            calculateinPeriodsBacklog();
        }

        else {
            return ShowWarning('Period is Mendatory');
        }
    });
    $('.advanceamountbacklog').on('keyup', function () {
        calculationBackLog();
        calculateinPeriodsBacklog();
    });
    $('.vatforSelectbacklog').on('change', function () {
        calculationBackLog();
        calculateinPeriodsBacklog();
    });
    $('.calculateAuthorityBackLog').on('keyup', function () {
        calculationBackLog();
        calculateinPeriodsBacklog();
    });
    $('.advanceamountBacklog').on('change', function () {
        calculationBackLog();
    });
    $('#ContentPlaceHolder1_ModeOfCharges').on('change', function () {
        debugger
        var valmodeofcharges = $("#ContentPlaceHolder1_ModeOfCharges").val();
        if (valmodeofcharges == "Discounted") {
            $(".discountNone").css("display", "block");
            $("#ContentPlaceHolder1_txtDiscountService").val("");
            $("#ContentPlaceHolder1_txtDiscountAmtService").val("");
            $('#ContentPlaceHolder1_txtDiscountService').addClass("req");
            $('#ContentPlaceHolder1_txtDiscountAmtService').addClass("req");
        }
        if (valmodeofcharges == "Complimentary") {
            $(".discountNone").css("display", "none");
            $("#ContentPlaceHolder1_txtSingleAmount").val("0.00");
            $("#ContentPlaceHolder1_txtTOTAL_AMOUNT").val("0.00");
            $("#ContentPlaceHolder1_txtCommissionP").val(0);
            $("#ContentPlaceHolder1_txtCommission").val("0.00");
            $("#ContentPlaceHolder1_ddlVATService").val(0);
            $("#ContentPlaceHolder1_txtVATAmountService").val("0.00");
            $("#ContentPlaceHolder1_txtAmountIncVATService").val("0.00");
            $("#ContentPlaceHolder1_txtDiscountService").val("0");
            $("#ContentPlaceHolder1_txtDiscountAmtService").val("0.00");
            $("#ContentPlaceHolder1_txtAdvancePaymentAmount").val("0.00");
            $('#ContentPlaceHolder1_txtDiscountService').removeClass("req");
            $('#ContentPlaceHolder1_txtDiscountAmtService').removeClass("req");
            calculation();
            calculateinPeriods();
        }
        if (valmodeofcharges == "Charged") {
            $(".discountNone").css("display", "none");
            $("#ContentPlaceHolder1_ddlVATService").val(5);
            $("#ContentPlaceHolder1_txtDiscountService").val(0);
            $("#ContentPlaceHolder1_txtDiscountAmtService").val("0.00");
            $("#ContentPlaceHolder1_txtDiscountService").val("0");
            $("#ContentPlaceHolder1_txtDiscountAmtService").val("0.00");
            $('#ContentPlaceHolder1_txtDiscountService').removeClass("req");
            $('#ContentPlaceHolder1_txtDiscountAmtService').removeClass("req");
            calculation();
            calculateinPeriods();
        }
    });
});
$(document).ready(function () {
    function calculationUpdate() {
        //Calculate Total Amount
        var optionValue = $("#PeriodValue").val();
        var data = $("#ProfessionalFee").val();
        result = optionValue * data;
        //$("#ContentPlaceHolder1_txtTotalAmountUpdate").val(result);

        //Apply Discount on Total Amount
        var DiscountApplyS = 0.00;
        // if ($("#ContentPlaceHolder1_txtDiscountUpdate").val() != "") {
        //     var DiscountApplyS = $("#ContentPlaceHolder1_txtDiscountUpdate").val();
        // }

        var AfterDiscount = (result * DiscountApplyS) / 100;
        $("#ContentPlaceHolder1_txtDiscountAmtUpdate").val(AfterDiscount.toFixed(2));
        var AfterApplyDiscount = parseFloat(result) - parseFloat(AfterDiscount);

        //Apply Commission on professional Amount
        var CommissionP = $("#ContentPlaceHolder1_txtCommissionPUpdate").val();
        var AfterCommission = (AfterApplyDiscount * CommissionP) / 100;
        if (AfterCommission != "") {
            $("#ContentPlaceHolder1_txtCommissionUpdate").val(AfterCommission.toFixed(2));
        }

        var actualAmount = AfterApplyDiscount - AfterCommission;
        $("#ContentPlaceHolder1_txtActualAmountUpdate").val(actualAmount.toFixed(2));

        //Apply VAT
        var VATApply = $("#ContentPlaceHolder1_ddlVATUpdate option:selected").val();
        var AfterVATApply = (AfterApplyDiscount * VATApply) / 100;
        $("#ContentPlaceHolder1_txtVAtAmountUpdate").val(AfterVATApply.toFixed(2));

        //Calculate with VAT Amount
        var AmountIncVAT = parseFloat(AfterApplyDiscount) + parseFloat(AfterVATApply);

        //Apply Authority Fee
        var authorityFee = 0;
        if ($("#ContentPlaceHolder1_txtAuthorityUpdate").val() != "") {
            authorityFee = $("#ContentPlaceHolder1_txtAuthorityUpdate").val();
        }
        var withAuthority = parseFloat(AmountIncVAT) + parseFloat(authorityFee);

        //After All Calculation 
        $("#ContentPlaceHolder1_txtAmountIncVATUpdate").val(withAuthority.toFixed(2));

        //Calculation Advance payment
        var optionPercentage = $("#ContentPlaceHolder1_ddlAdvancePUpdate").val();

        if (optionPercentage == '25%') {
            var AdvancePayment = (withAuthority.toFixed(2) * 25) / 100;
        }
        else if (optionPercentage == '50%') {
            var AdvancePayment = withAuthority.toFixed(2) / 2;
        }
        else if (optionPercentage == '75%') {
            var AdvancePayment = (withAuthority.toFixed(2) * 75) / 100;
        }
        else if (optionPercentage == '100%') {
            var AdvancePayment = withAuthority.toFixed(2) / 1;
        }
        $("#ContentPlaceHolder1_txtAdvanceAmountUpdate").val(AdvancePayment.toFixed(2));
    };
    function calculateinPeriodsupdates() {
        debugger
        var amountupdate = 0;
        if ($('#ContentPlaceHolder1_txtProfessionalFeeUpdate').val() != "") {
            amountupdate = $('#ContentPlaceHolder1_txtProfessionalFeeUpdate').val();
        }
        var discountPercenatge = 0;
        if ($("#ContentPlaceHolder1_txtDiscountUpdate").val() != "") {
            discountPercenatge = $("#ContentPlaceHolder1_txtDiscountUpdate").val();
        }

        var calculateDiscount = (amountupdate * discountPercenatge) / 100;

        var totalAfterDiscount = parseFloat(amountupdate) - parseFloat(calculateDiscount);


        var commissionP = 0;
        if ($("#ContentPlaceHolder1_txtCommissionPUpdate").val() != "") {
            commissionP = $("#ContentPlaceHolder1_txtCommissionPUpdate").val();
        }
        var calculatecommission = (totalAfterDiscount * commissionP) / 100;

        var totalActualAmount = parseFloat(totalAfterDiscount) - parseFloat(calculatecommission);


        var vatapply = $("#ContentPlaceHolder1_ddlVATUpdate option:selected").val();
        var vatAmount = (totalAfterDiscount * vatapply) / 100;
        var finalVatAmount = vatAmount.toFixed(2);

        var authorityFee = 0.00;
        if ($("#ContentPlaceHolder1_txtAuthorityUpdate").val() != "") {
            authorityFee = $("#ContentPlaceHolder1_txtAuthorityUpdate").val();
        }
        var withvattotalAmount = parseFloat(totalAfterDiscount) + parseFloat(vatAmount) + parseFloat(authorityFee);
        var finalwithvattotal = withvattotalAmount.toFixed(2);
        debugger
        $('.amount').text(amountupdate);
        $('.discountPrcnt').text(discountPercenatge);
        $('.discountAmount').text(calculateDiscount);
        $('.commissionP').text(commissionP);
        $('.commissionAmount').text(calculatecommission);
        $('.ActualAmount').text(totalActualAmount);
        $('.vat').text(vatapply);
        $('.vatAmount').text(finalVatAmount);
        $('.authorityFee').text(authorityFee);
        $('.withVATAmount').text(finalwithvattotal);
    }
    $('.professionalFee').on('keyup', function () {
        calculationUpdate();
        calculateinPeriodsupdates();
    });
    $('.calculateAuthorityUpdate').on('keyup', function () {
        calculationUpdate();
        var rowCount = $('#tblPeriodsUpdate tr').length;
        if (rowCount == 2) {

            var authorityFee = 0.00;
            if ($("#ContentPlaceHolder1_txtAuthorityUpdate").val() != "") {
                authorityFee = $("#ContentPlaceHolder1_txtAuthorityUpdate").val();
            }
            var amount = $('.amount').text();
            var discountAmountP = 0.00;
            if ($("#ContentPlaceHolder1_txtAuthorityUpdate").val() != "0.00") {
                discountAmountP = $("#ContentPlaceHolder1_txtDiscountAmtUpdate").val();
            }
            var discountMinus = parseFloat(amount) - parseFloat(discountAmountP);
            var vatAmount = $('.vatAmount').text();
            $('.authorityFee').text(authorityFee);
            var withAuthority = parseFloat(discountMinus) + parseFloat(vatAmount) + parseFloat(authorityFee);
            $('.withVATAmount').text(withAuthority);
        }
        else {
            $("#ContentPlaceHolder1_txtAuthorityUpdate").val("");
            return ShowWarning('Authority Fee will not add for multiple periods, please select One time in Type of Assignment');
        }
    });
    $('.amountForAss').on('change', function () {
        calculationUpdate();
    });
    $('.vatforSelect').on('change', function () {
        calculationUpdate();
        calculateinPeriodsupdates();
    });
    $('.advanceamount1').on('change', function () {
        calculationUpdate();
    });
    $('.calculatePerUpdate').on('change', function () {
        var TotalAmount = $("#ContentPlaceHolder1_txtTotalAmountUpdate").val();
        var discount = $("#ContentPlaceHolder1_txtDiscountAmtUpdate").val();
        var discountAmount = TotalAmount - discount;
        var Commission = $("#ContentPlaceHolder1_txtCommissionUpdate").val();
        debugger
        var calculatePerc = (Commission * 100) / discountAmount;
        $("#ContentPlaceHolder1_txtCommissionPUpdate").val(calculatePerc);

        calculationUpdate();
        calculateinPeriodsupdates();

    });
    $('.DirectDiscountUpdate').on('change', function () {
        debugger
        var TotalAmount = $("#ContentPlaceHolder1_txtTotalAmountUpdate").val();
        var discount = $("#ContentPlaceHolder1_txtDiscountAmtUpdate").val();
        var getDiscount = (discount * 100) / TotalAmount;
        $("#ContentPlaceHolder1_txtDiscountUpdate").val(getDiscount);

        calculationUpdate();
        calculateinPeriodsupdates();

    });

    $('#ContentPlaceHolder1_txtDiscountUpdate').on('keyup', function () {
        debugger
        var value = $("#ContentPlaceHolder1_txtDiscountUpdate").val();
        if (value <= 100) {
            calculationUpdate();
            calculateinPeriodsupdates();
        }
        else {
            $("#ContentPlaceHolder1_txtDiscountUpdate").val("");
            return ShowWarning('Not Supported');
        }
    });

    $('#ContentPlaceHolder1_txtCommissionPUpdate').on('keyup', function () {
        debugger
        var value = $("#ContentPlaceHolder1_txtCommissionPUpdate").val();
        if (value <= 100) {
            calculationUpdate();
            calculateinPeriodsupdates();
        }
        else {
            $("#ContentPlaceHolder1_txtCommissionPUpdate").val("");
            return ShowWarning('Not Supported');
        }
    });

    $("#ContentPlaceHolder1_ddlTypeofAssUpdate").on('change', function () {
        var period = $("#ContentPlaceHolder1_ddlTypeofAssUpdate option:selected").val();
        fromdate = new Date($("#ContentPlaceHolder1_txtPeriodFromUpdate").val());
        todate = new Date($("#ContentPlaceHolder1_txtPeriodToUpdate").val());
        var monthCal = monthDiff(fromdate, todate);
        var halfyearly = 6;
        var quarterly = 3;
        var monthly = 12;

        if (period != "") {
            $('#tblPeriodsUpdate tbody tr').remove();
            if (period == "4") {

                if (monthCal < 12 || monthCal > 120) {
                    return ShowWarning('If your selection is yearly then you can select only 1 year Date');
                }
                else {

                    var devideValue = monthCal / 12;
                    var firstTextboxValue = $("#ContentPlaceHolder1_txtPeriodFromUpdate").val();
                    $("#ContentPlaceHolder1_txtPeriodValueUpdate").val(devideValue);
                    const firstdate = new Date(firstTextboxValue);
                    const seconddate = new Date(firstdate);
                    const duedate = new Date(firstdate);
                    const Amcaduedate = new Date(firstdate);
                    seconddate.setDate(firstdate.getDate());
                    duedate.setDate(firstdate.getDate());
                    Amcaduedate.setDate(firstdate.getDate());

                    for (dateCount = 0; dateCount < devideValue; dateCount++) {
                        const seconddate1 = new Date(seconddate.setMonth(firstdate.getMonth() + 12));
                        const duedate1 = new Date(duedate.setMonth(firstdate.getMonth() + 12));
                        const Amcaduedate1 = new Date(Amcaduedate.setMonth(firstdate.getMonth() + 12));
                        seconddate1.setDate(seconddate1.getDate() - 1);
                        duedate1.setDate(duedate1.getDate() + 9);
                        Amcaduedate1.setDate(Amcaduedate1.getDate() + 6);

                        var row1 = "<tr>";

                        row1 += "<td class='clsdata'>" + formatDate(firstdate) + "</td>";
                        row1 += "<td class='clsdata1'>" + formatDate(seconddate1) + "</td>";
                        row1 += "<td class='amcaduedate'>" + formatDate(Amcaduedate1) + "</td>";
                        row1 += "<td class='serviceduedate'>" + formatDate(duedate1) + "</td>";
                        row1 += "<td class='amount'></td>";
                        row1 += "<td class='discountPrcnt'></td>";
                        row1 += "<td class='discountAmount'></td>";
                        row1 += "<td class='commissionP'></td>";
                        row1 += "<td class='commissionAmount'></td>";
                        row1 += "<td class='ActualAmount'></td>";
                        row1 += "<td class='vat'></td>";
                        row1 += "<td class='vatAmount'></td>";
                        row1 += "<td class='authorityFee'></td>";
                        row1 += "<td class='withVATAmount'></td>";
                        //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                        row1 += "</tr>";

                        firstdate.setMonth(firstdate.getMonth() + 12);

                        $('#tblPeriodsUpdate tbody').append(row1);
                    }
                }
            }

            else if (period == "3") {
                var devideValue = monthCal / halfyearly;
                var firstTextboxValue = $("#ContentPlaceHolder1_txtPeriodFromUpdate").val();
                $("#ContentPlaceHolder1_txtPeriodValueUpdate").val(devideValue);
                const firstdate = new Date(firstTextboxValue);
                const seconddate = new Date(firstdate);
                const duedate = new Date(firstdate);
                const Amcaduedate = new Date(firstdate);
                seconddate.setDate(firstdate.getDate());
                duedate.setDate(firstdate.getDate());
                Amcaduedate.setDate(firstdate.getDate());

                for (dateCount = 0; dateCount < devideValue; dateCount++) {
                    const seconddate1 = new Date(seconddate.setMonth(firstdate.getMonth() + parseInt(halfyearly)));
                    const duedate1 = new Date(duedate.setMonth(firstdate.getMonth() + parseInt(halfyearly)));
                    const Amcaduedate1 = new Date(Amcaduedate.setMonth(firstdate.getMonth() + parseInt(halfyearly)));
                    seconddate1.setDate(seconddate1.getDate() - 1);
                    duedate1.setDate(duedate1.getDate() + 9);
                    Amcaduedate1.setDate(Amcaduedate1.getDate() + 6);

                    var row1 = "<tr>";

                    row1 += "<td class='clsdata'>" + formatDate(firstdate) + "</td>";
                    row1 += "<td class='clsdata1'>" + formatDate(seconddate1) + "</td>";
                    row1 += "<td class='amcaduedate'>" + formatDate(Amcaduedate1) + "</td>";
                    row1 += "<td class='serviceduedate'>" + formatDate(duedate1) + "</td>";

                    row1 += "<td class='amount'></td>";
                    row1 += "<td class='discountPrcnt'></td>";
                    row1 += "<td class='discountAmount'></td>";
                    row1 += "<td class='commissionP'></td>";
                    row1 += "<td class='commissionAmount'></td>";
                    row1 += "<td class='ActualAmount'></td>";
                    row1 += "<td class='vat'></td>";
                    row1 += "<td class='vatAmount'></td>";
                    row1 += "<td class='authorityFee'></td>";
                    row1 += "<td class='withVATAmount'></td>";
                    //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                    row1 += "</tr>";

                    firstdate.setMonth(firstdate.getMonth() + parseInt(halfyearly));

                    $('#tblPeriodsUpdate tbody').append(row1);
                }
            }
            else if (period == "1") {
                var devideValue = monthCal;
                var addMonth = monthCal / monthly;
                $("#ContentPlaceHolder1_txtPeriodValueUpdate").val(devideValue);
                var firstTextboxValue = $("#ContentPlaceHolder1_txtPeriodFromUpdate").val();
                const firstdate = new Date(firstTextboxValue);
                const seconddate = new Date(firstdate);
                const duedate = new Date(firstdate);
                const Amcaduedate = new Date(firstdate);
                seconddate.setDate(firstdate.getDate());
                duedate.setDate(firstdate.getDate());
                Amcaduedate.setDate(firstdate.getDate());

                for (dateCount = 0; dateCount < devideValue; dateCount++) {
                    const seconddate1 = new Date(seconddate.setMonth(firstdate.getMonth() + parseInt(1)));
                    const duedate1 = new Date(duedate.setMonth(firstdate.getMonth() + parseInt(1)));
                    const Amcaduedate1 = new Date(Amcaduedate.setMonth(firstdate.getMonth() + parseInt(1)));
                    seconddate1.setDate(seconddate1.getDate() - 1);
                    duedate1.setDate(duedate1.getDate() + 9);
                    Amcaduedate1.setDate(Amcaduedate1.getDate() + 6);

                    var row1 = "<tr>";

                    row1 += "<td class='clsdata'>" + formatDate(firstdate) + "</td>";
                    row1 += "<td class='clsdata1'>" + formatDate(seconddate1) + "</td>";
                    row1 += "<td class='amcaduedate'>" + formatDate(Amcaduedate1) + "</td>";
                    row1 += "<td class='serviceduedate'>" + formatDate(duedate1) + "</td>";

                    row1 += "<td class='amount'></td>";
                    row1 += "<td class='discountPrcnt'></td>";
                    row1 += "<td class='discountAmount'></td>";
                    row1 += "<td class='commissionP'></td>";
                    row1 += "<td class='commissionAmount'></td>";
                    row1 += "<td class='ActualAmount'></td>";
                    row1 += "<td class='vat'></td>";
                    row1 += "<td class='vatAmount'></td>";
                    row1 += "<td class='authorityFee'></td>";
                    row1 += "<td class='withVATAmount'></td>";
                    //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                    row1 += "</tr>";

                    firstdate.setMonth(firstdate.getMonth() + parseInt(1));

                    $('#tblPeriodsUpdate tbody').append(row1);
                }
            }
            else if (period == "2") {

                var devideValue = monthCal / quarterly;
                var firstTextboxValue = $("#ContentPlaceHolder1_txtPeriodFromUpdate").val();
                $("#ContentPlaceHolder1_txtPeriodValueUpdate").val(devideValue);
                const firstdate = new Date(firstTextboxValue);
                const seconddate = new Date(firstdate);
                const duedate = new Date(firstdate);
                const Amcaduedate = new Date(firstdate);
                seconddate.setDate(firstdate.getDate());
                duedate.setDate(firstdate.getDate());
                Amcaduedate.setDate(firstdate.getDate());

                for (dateCount = 0; dateCount < devideValue; dateCount++) {
                    const seconddate1 = new Date(seconddate.setMonth(firstdate.getMonth() + parseInt(quarterly)));
                    const duedate1 = new Date(duedate.setMonth(firstdate.getMonth() + parseInt(quarterly)));
                    const Amcaduedate1 = new Date(Amcaduedate.setMonth(firstdate.getMonth() + parseInt(quarterly)));
                    seconddate1.setDate(seconddate1.getDate() - 1);
                    duedate1.setDate(duedate1.getDate() + 27);
                    Amcaduedate1.setDate(Amcaduedate1.getDate() + 24);

                    var row1 = "<tr>";

                    row1 += "<td class='clsdata'>" + formatDate(firstdate) + "</td>";
                    row1 += "<td class='clsdata1'>" + formatDate(seconddate1) + "</td>";
                    row1 += "<td class='amcaduedate'>" + formatDate(Amcaduedate1) + "</td>";
                    row1 += "<td class='serviceduedate'>" + formatDate(duedate1) + "</td>";

                    row1 += "<td class='amount'></td>";
                    row1 += "<td class='discountPrcnt'></td>";
                    row1 += "<td class='discountAmount'></td>";
                    row1 += "<td class='commissionP'></td>";
                    row1 += "<td class='commissionAmount'></td>";
                    row1 += "<td class='ActualAmount'></td>";
                    row1 += "<td class='vat'></td>";
                    row1 += "<td class='vatAmount'></td>";
                    row1 += "<td class='authorityFee'></td>";
                    row1 += "<td class='withVATAmount'></td>";
                    //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                    row1 += "</tr>";

                    firstdate.setMonth(firstdate.getMonth() + parseInt(quarterly));

                    $('#tblPeriodsUpdate tbody').append(row1);
                }
            }
            else if (period == "6") {
                devideValue = 1;
                var row1 = "<tr>";
                row1 += "<td class='clsdata'>" + $("#ContentPlaceHolder1_txtPeriodFromUpdate").val() + "</td>";
                row1 += "<td class='clsdata1'>" + $("#ContentPlaceHolder1_txtPeriodToUpdate").val() + "</td>";
                row1 += "<td class='amcaduedate'>" + $("#ContentPlaceHolder1_txtPeriodToUpdate").val() + "</td>";
                row1 += "<td class='serviceduedate'>" + $("#ContentPlaceHolder1_txtPeriodToUpdate").val() + "</td>";

                row1 += "<td class='amount'></td>";
                row1 += "<td class='discountPrcnt'></td>";
                row1 += "<td class='discountAmount'></td>";
                row1 += "<td class='commissionP'></td>";
                row1 += "<td class='commissionAmount'></td>";
                row1 += "<td class='ActualAmount'></td>";
                row1 += "<td class='vat'></td>";
                row1 += "<td class='vatAmount'></td>";
                row1 += "<td class='authorityFee'></td>";
                row1 += "<td class='withVATAmount'></td>";
                //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                row1 += "</tr>";

                $('#tblPeriodsUpdate tbody').append(row1);
                $("#ContentPlaceHolder1_txtPeriodValueUpdate").val(devideValue);
            }
            else if (period == "5") {
                devideValue = 1;

                var row1 = "<tr>";
                row1 += "<td class='clsdata'>" + $("#ContentPlaceHolder1_txtPeriodFromUpdate").val() + "</td>";
                row1 += "<td class='clsdata1'>" + $("#ContentPlaceHolder1_txtPeriodToUpdate").val() + "</td>";
                row1 += "<td class='amcaduedate'>" + $("#ContentPlaceHolder1_txtPeriodToUpdate").val() + "</td>";
                row1 += "<td class='serviceduedate'>" + $("#ContentPlaceHolder1_txtPeriodToUpdate").val() + "</td>";
                row1 += "<td class='amount'></td>";
                row1 += "<td class='discountPrcnt'></td>";
                row1 += "<td class='discountAmount'></td>";
                row1 += "<td class='commissionP'></td>";
                row1 += "<td class='commissionAmount'></td>";
                row1 += "<td class='ActualAmount'></td>";
                row1 += "<td class='vat'></td>";
                row1 += "<td class='vatAmount'></td>";
                row1 += "<td class='authorityFee'></td>";
                row1 += "<td class='withVATAmount'></td>";
                //row1 += "<td><i class='fa fa-trash' style='cursor:pointer' onclick='DeleteRow(this);'> Remove</i> </td>";
                row1 += "</tr>";

                $('#tblPeriodsUpdate tbody').append(row1);
                $("#ContentPlaceHolder1_txtPeriodValueUpdate").val(devideValue);
            }
            calculationUpdate();
            calculateinPeriodsupdates();
        }
        else {
            return ShowWarning('Period is Mendatory');
        }
    });
    changeModeUpdate();
    function changeModeUpdate() {
        var valmodeofcharges = $("#ContentPlaceHolder1_ddlModeofChargeUpdate").val();
        if (valmodeofcharges == "Discounted") {
            $(".discountNoneUpdate").css("display", "block");
            $('#ContentPlaceHolder1_txtDiscountUpdate').addClass("requp");
            $('#ContentPlaceHolder1_txtDiscountAmtUpdate').addClass("requp");
        }
        if (valmodeofcharges == "Complimentary") {
            $(".discountNoneUpdate").css("display", "none");
            $("#ContentPlaceHolder1_txtProfessionalFeeUpdate").val("0.00");
            $("#ContentPlaceHolder1_txtTotalAmountUpdate").val("0.00");
            $("#ContentPlaceHolder1_ddlVATUpdate").val(0);
            $("#ContentPlaceHolder1_txtVAtAmountUpdate").val("0.00");
            $("#ContentPlaceHolder1_txtAmountIncVATUpdate").val("0.00");
            $("#ContentPlaceHolder1_txtAdvanceAmountUpdate").val("0.00");
            $("#ContentPlaceHolder1_txtCommissionPUpdate").val("0");
            $("#ContentPlaceHolder1_txtCommissionUpdate").val("0");
            $("#ContentPlaceHolder1_txtActualAmountUpdate").val("0");
            $("#ContentPlaceHolder1_txtDiscountUpdate").val("0");
            $("#ContentPlaceHolder1_txtDiscountAmtUpdate").val("0");
            $('#ContentPlaceHolder1_txtDiscountUpdate').removeClass("requp");
            $('#ContentPlaceHolder1_txtDiscountAmtUpdate').removeClass("requp");
            calculationUpdate();
            calculateinPeriodsupdates();
        }
        if (valmodeofcharges == "Charged") {
            $(".discountNoneUpdate").css("display", "none");
            $("#ContentPlaceHolder1_ddlVATUpdate").val(5);
            $("#ContentPlaceHolder1_txtDiscountUpdate").val(0);
            $("#ContentPlaceHolder1_txtDiscountAmtUpdate").val("0.00");
            $('#ContentPlaceHolder1_txtDiscountUpdate').removeClass("requp");
            $('#ContentPlaceHolder1_txtDiscountAmtUpdate').removeClass("requp");
            calculationUpdate();
            calculateinPeriodsupdates();
        }
    }

    $('#ContentPlaceHolder1_ddlModeofChargeUpdate').on('change', function () {
        changeModeUpdate();
    });
});

function totalQuotation() {
    //Total Amount
    var totalAmountBefore = $("#ContentPlaceHolder1_hdnprofessionalFee").val();
    var totalQuotationAmount = $("#ContentPlaceHolder1_lblProfessionalFee").val();
    var result = parseFloat(totalQuotationAmount) - parseFloat(totalAmountBefore);
    var newTotalAmount = $("#ContentPlaceHolder1_txtTotalAmountUpdate").val();
    var newQuotationAmount = parseFloat(newTotalAmount) + parseFloat(result);
    $("#ContentPlaceHolder1_lblProfessionalFee").val(newQuotationAmount);

    //Discount Amount
    var totalDiscountAmountBefore = $("#ContentPlaceHolder1_hdnDiscountAmount").val();
    var totalQuotationDiscountAmount = $("#ContentPlaceHolder1_lblDiscountAmount").val();
    var result = parseFloat(totalQuotationDiscountAmount) - parseFloat(totalDiscountAmountBefore);
    var newDiscountAmount = $("#ContentPlaceHolder1_txtDiscountAmtUpdate").val();
    var newQuotationDiscountAmount = parseFloat(newDiscountAmount) + parseFloat(result);
    $("#ContentPlaceHolder1_lblDiscountAmount").val(newQuotationDiscountAmount);

    //VAT Amount
    var totalVATAmountBefore = $("#ContentPlaceHolder1_hdnVATAmount").val();
    var totalQuotationVATAmount = $("#ContentPlaceHolder1_lblVATAmount").val();
    var result = parseFloat(totalQuotationVATAmount) - parseFloat(totalVATAmountBefore);
    var newVATAmount = $("#ContentPlaceHolder1_txtVAtAmountUpdate").val();
    var newQuotationVATAmount = parseFloat(newVATAmount) + parseFloat(result);
    $("#ContentPlaceHolder1_lblVATAmount").val(newQuotationVATAmount);

    //Authority Fee
    var totalAuthorityBefore = $("#ContentPlaceHolder1_hdnAuhorityFee").val();
    var totalQuotationAuthority = $("#ContentPlaceHolder1_lblAuthorityFee").val();
    var result = parseFloat(totalQuotationAuthority) - parseFloat(totalAuthorityBefore);
    var newAuthorityAmount = $("#ContentPlaceHolder1_txtAuthorityUpdate").val();
    var newQuotationAuthorityAmount = parseFloat(newAuthorityAmount) + parseFloat(result);
    $("#ContentPlaceHolder1_lblAuthorityFee").val(newQuotationAuthorityAmount);

    //Authority Fee
    var totalIncAmountBefore = $("#ContentPlaceHolder1_hdnAmountIncVAT").val();
    var totalIncAmount = $("#ContentPlaceHolder1_lblQuotationAmountwithVAT").val();
    var result = parseFloat(totalIncAmount) - parseFloat(totalIncAmountBefore);
    var newIncAmount = $("#ContentPlaceHolder1_txtAmountIncVATUpdate").val();
    var newQuotationIncAmount = parseFloat(newIncAmount) + parseFloat(result);
    $("#ContentPlaceHolder1_lblQuotationAmountwithVAT").val(newQuotationIncAmount);

    //Advance Amount
    var totalAdvanceBefore = $("#ContentPlaceHolder1_hdnAdvanceAmount").val();
    var totalQuotationAdvance = $("#ContentPlaceHolder1_lblTotalAdvancepayment").val();
    var result = parseFloat(totalQuotationAdvance) - parseFloat(totalAdvanceBefore);
    var newAdvanceAmount = $("#ContentPlaceHolder1_txtAdvanceAmountUpdate").val();
    var newQuotationAdvanceAmount = parseFloat(newAdvanceAmount) + parseFloat(result);
    $("#ContentPlaceHolder1_lblTotalAdvancepayment").val(newQuotationAdvanceAmount);
}
function totalQuotationdelete() {
    //Total Amount
    var totalAmountBefore = $("#ContentPlaceHolder1_hdnprofessionalFee").val();
    var totalQuotationAmount = $("#ContentPlaceHolder1_lblProfessionalFee").val();
    var result = parseFloat(totalQuotationAmount) - parseFloat(totalAmountBefore);
    $("#ContentPlaceHolder1_lblProfessionalFee").val(result);

    //Discount Amount
    var totalDiscountAmountBefore = $("#ContentPlaceHolder1_hdnDiscountAmount").val();
    var totalQuotationDiscountAmount = $("#ContentPlaceHolder1_lblDiscountAmount").val();
    var result = parseFloat(totalQuotationDiscountAmount) - parseFloat(totalDiscountAmountBefore);
    $("#ContentPlaceHolder1_lblDiscountAmount").val(result);

    //VAT Amount
    var totalVATAmountBefore = $("#ContentPlaceHolder1_hdnVATAmount").val();
    var totalQuotationVATAmount = $("#ContentPlaceHolder1_lblVATAmount").val();
    var result = parseFloat(totalQuotationVATAmount) - parseFloat(totalVATAmountBefore);
    $("#ContentPlaceHolder1_lblVATAmount").val(result);

    //Authority Fee
    var totalAuthorityBefore = $("#ContentPlaceHolder1_hdnAuhorityFee").val();
    var totalQuotationAuthority = $("#ContentPlaceHolder1_lblAuthorityFee").val();
    var result = parseFloat(totalQuotationAuthority) - parseFloat(totalAuthorityBefore);
    $("#ContentPlaceHolder1_lblAuthorityFee").val(result);

    //Authority Fee
    var totalIncAmountBefore = $("#ContentPlaceHolder1_hdnAmountIncVAT").val();
    var totalIncAmount = $("#ContentPlaceHolder1_lblQuotationAmountwithVAT").val();
    var result = parseFloat(totalIncAmount) - parseFloat(totalIncAmountBefore);
    $("#ContentPlaceHolder1_lblQuotationAmountwithVAT").val(result);

    //Advance Amount
    var totalAdvanceBefore = $("#ContentPlaceHolder1_hdnAdvanceAmount").val();
    var totalQuotationAdvance = $("#ContentPlaceHolder1_lblTotalAdvancepayment").val();
    var result = parseFloat(totalQuotationAdvance) - parseFloat(totalAdvanceBefore);
    $("#ContentPlaceHolder1_lblTotalAdvancepayment").val(result);
}
