$(function () {
    
    // Toolbar extra buttons
    var btnFinish = $('<button></button>').text('Finish').addClass('btn btn-success sw-btn-finish').on('click', function(){ window.location.href = "welcome"; });

    // Step show event
    $("#smartwizard-default").on("showStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
        $(".sw-btn-prev").removeClass('disabled');
        $(".sw-btn-next").removeClass('disabled');
        $(".sw-btn-finish").addClass('disabled');
        if(stepPosition === 'first') {
            $(".sw-btn-prev").addClass('disabled');
        } else if(stepPosition === 'final') {
            $(".sw-btn-next").addClass('disabled');
            $(".sw-btn-finish").removeClass('disabled');
        } else {
            $(".sw-btn-prev").removeClass('disabled');
            $(".sw-btn-next").removeClass('disabled');
        }
    });



    // Smart Wizard
    $('#smartwizard-default').smartWizard({
        selected: 0,
        useURLhash: false,
        showStepURLhash: false,
        toolbarSettings: {
            toolbarExtraButtons: [btnFinish]
        }
    });

    $("#smartwizard-default").on("leaveStep", function(e, anchorObject, stepIndex, stepDirection) {
        //return confirm("Do you want to leave the step "+stepIndex+"?");
    });

    // $("form").validate({
    //     rules: {
    //         school_name: "required"
    //     }
    // });
});