
$(document).on('click', '.Panel-AutoCollapsible', function (e) {

    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }
})

$(document).on('click', '.upDownIconToggle', function () {

    var $this = $(this);

    if (($this).hasClass('collapsed')) {
        $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }
    else {
        $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    }

});

var PrevValue = "";

$(document).on('click', '.upDownIconToggleCPE', function () {

    var $this = $(this);

    if (PrevValue != "") {
        if (PrevValue.attr('data-target') == $(this).attr('data-target')) {
            if ($(this).find('i').hasClass('glyphicon-chevron-down')) {
                $(this).find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up')
                return;
            }
            else {
                $(this).find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down')
                return;
            }
        }
        else {
            PrevValue.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        }
        $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }
    if (($this).hasClass('collapsed')) {
        $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        PrevValue = $this;
        return;
    }
    if (!($this).hasClass('collapsed')) {
        $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        return;
    }

});

$(document).on('click', '.upDownIconToggleVoice', function () {

    var $this = $(this);

    if (PrevValue != "") {
        if (PrevValue.attr('data-target') == $(this).attr('data-target')) {
            if ($(this).find('i').hasClass('glyphicon-chevron-down')) {
                $(this).find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up')
                return;
            }
            else {
                $(this).find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down')
                return;
            }
        }
        else {
            PrevValue.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        }
        $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }
    if (($this).hasClass('collapsed')) {
        $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        PrevValue = $this;
        return;
    }
    if (!($this).hasClass('collapsed')) {
        $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        return;
    }

});

