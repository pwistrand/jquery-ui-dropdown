(function( $ ) {
  $.widget( "ezyui.dropdown", {

    options: {
        // on selected callback
        selected: function() {},
        // the html template for the selected item
        selectedTemplate: $.template(''),
        // the html template for header of items
        headerTemplate: $.template(''),
        // the html template for an item
        itemTemplate: $.template(''),
        // the html template for footer of items
        footerTemplate: $.template('')
    },

    _create: function() {
        var self = this;
        this.element
            .addClass("dd")
            .disableSelection(); // prevents the text from being selected as result of clicking

        this.element.on("click", function() {
            self.element.find(".dd-items").toggle(); //TODO: just check the this context and $(this)
        });

        this.element.empty();
        this.element.append('\
<div class="dd-selected">\
</div>\
<div class="dd-items">\
    <ul>\
    </ul>\
</div>\
        ');
        this.element.find(".dd-items").toggle();    // not working! it did in jsfiddle!
    },
    refresh: function() {
        var self = this;
        return function(args) {

            var selected = self.element.find(".dd-selected");
            selected.empty();
            if (args.value) {
                $.tmpl(self.options.selectedTemplate, args.value).appendTo(selected);
            }

            var items = args.items || [];
            var list = self.element.find(".dd-items ul").empty();

            // TODO: we should be responsible for the creation of the <li><a ... and therefore not require it in the template
            $.tmpl(self.options.itemTemplate, items).appendTo(list);
            list.find("li a").each(function(k) {
                $(this).data("vm", items[k]);
                $(this).on("click", function() {
                    var item = $(this).data("vm");
                    selected.empty();
                    $.tmpl(self.options.selectedTemplate, item).appendTo(selected);
                    self.options.selected(item);
                });
            });
        };
    },

    // Use the _setOption method to respond to changes to options
    _setOption: function( key, value ) {
      switch( key ) {
        case "selectedTemplate":
            break;
      }

      // In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget
      $.Widget.prototype._setOption.apply( this, arguments );
      // In jQuery UI 1.9 and above, you use the _super method instead
      this._super( "_setOption", key, value );
    },

    // Use the destroy method to clean up any modifications your widget has made to the DOM
    destroy: function() {
      // In jQuery UI 1.8, you must invoke the destroy method from the base widget
      $.Widget.prototype.destroy.call( this );
      // In jQuery UI 1.9 and above, you would define _destroy instead of destroy and not call the base method
    }
  });
}( jQuery ) );