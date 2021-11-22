/*
 Vue.js Geocledian zones component
 created: 2021-11-19, jsommer
 updated: 2021-11-19, jsommer
 version: 0.1
*/
"use strict";

//language strings
const gcZonesLocales = {
  "en": {
    "options": { "title": "Zones", "date_format_hint": "YYYY-MM-DD", },
    "zones" : {
      "settings": "Zones options",
      "startdate": "Start date",
      "enddate": "End date",
      "getZones": "Get Zones",
      "reset": "Reset",
      "pixelsize": "Pixel size"
    }
  },
  "de": {
    "options": { "title": "Zonen", "date_format_hint": "JJJJ-MM-TT", },
    "zones" : {
      "settings": "Zonen Einstellungen",
      "startdate": "Anfangsdatum",
      "enddate": "Enddatum",
      "getZones": "Zonen",
      "reset": "Zurücksetzen",
      "pixelsize": "Pixelgröße"
    }
  },
}

Vue.component('gc-zones-control', {
  props: {
    gcWidgetId: {
      type: String,
      default: 'zones1',
      required: true
    },
    gcLayout: {
      type: String,
      default: 'vertical' // or horizontal
    },
    gcAvailableOptions: {
      type: String,
      default: 'widgetTitle'
    },
    gcWidgetCollapsed: {
      type: Boolean,
      default: false // or false
    },
    gcLanguage: {
      type: String,
      default: 'en' // 'en' | 'de'
    },
    gcStartdate: {
      type: String,
      default: ''
    },
    gcEnddate: {
      type: String,
      default: ''
    }
  },
  template: `<div :id="this.gcWidgetId" class="">

                <p :class="['gc-options-title', 'is-size-6', gcWidgetCollapsed ? 'is-grey' : 'is-orange']" 
                  style="cursor: pointer; margin-bottom: 0.5em;"    
                  v-on:click="toggleZones" 
                  v-show="availableOptions.includes('widgetTitle')"> 
                  {{ $t('options.title')}}
                  <i :class="[!gcWidgetCollapsed ? '': 'is-active', 'fas', 'fa-angle-down', 'fa-sm']"></i>
                </p>

                <!-- zones container -->
                <div :class="[!gcWidgetCollapsed ? '': 'is-hidden']" style="margin-bottom: 1em;">

                  <div style="margin-top: 0.5em; margin-bottom: 0.5em;">
                    <p :class="['is-6 ', !zonesSettings ? 'is-grey' : 'is-orange']" 
                    v-on:click="zonesSettings =! zonesSettings" style="cursor: pointer; margin-bottom: 0.5em!important;">
                    {{ $t('zones.settings') }} 
                    <i :class="[zonesSettings ? '': 'is-active', 'fas', 'fa-angle-down', 'fa-sm']"></i>
                    </p>
                  </div>

                  <!-- zones settings -->
                  <div :class="[zonesSettings ? '' : 'is-hidden', layoutCSSMap['alignment'][gcLayout]]">
                    <div :class="['field', 'gc-field-'+gcLayout]">
                      <label class="label is-grey is-small has-text-left"> {{ $t('zones.startdate') }} </label>
                      <div class="control">
                        <input :id="'inpstartdate_'+ gcWidgetId" type="text" class="input is-small" v-bind:placeholder="'[' + $t('options.date_format_hint') +']'" v-model="startDate">
                      </div>
                    </div>
                    <div :class="['field', 'gc-field-'+gcLayout]">
                      <label class="label is-grey is-small has-text-left"> {{ $t('zones.enddate') }} </label>
                      <div class="control">
                        <input :id="'inpenddate_'+ gcWidgetId" type="text" class="input is-small" v-bind:placeholder="'[' + $t('options.date_format_hint') +']'" v-model="endDate">
                      </div>
                    </div>

                    <div :class="['field', 'gc-field-'+gcLayout]">
                      <div class="is-small">
                        <label class="label is-grey is-small has-text-left"> {{ $t('zones.pixelsize') }}: {{pixelSize}}m </label>
                        <input type="range" class="slider is-small is-orange" min="1" max="30" value="10" step="1" 
                            v-model="pixelSize">
                        <button class="button is-small is-orange is-light" 
                          style="vertical-align: middle !important;" :title="$t('zones.reset')" v-on:click="pixelSize=10;">
                          <i class="fas fa-undo fa"></i>
                        </button>
                      </div>
                    </div>

                  </div> <!-- zones settings -->
        
                  <!-- zones buttons -->
                  <div class="is-flex" style="padding-top: 0.5em;">
                    <button class="button is-light is-orange gc-button-analytics" v-on:click="getZones()">
                      <span class="content"><i class="fas fa-tractor fa-sm"></i> {{ $t('zones.getZones')}} </span>
                    </button>
                  </div><!-- zones buttons -->

                </div><!-- zones container -->

            </div><!-- gcWidgetId -->`,
  data: function () {
    console.debug("gc-zones - data()");
    return {
        zones: "",
        pixelSize: 10,
        zonesSettings: true,
        startdateCalendar: undefined,
        enddateCalendar: undefined,
        layoutCSSMap: { "alignment": {"vertical": "is-inline-block", "horizontal": "is-flex" }}
    }
  },
  i18n: { 
    locale: this.currentLanguage,
    messages: gcZonesLocales
  },
  created: function () {
    console.debug("gc-zones! - created()");
    this.changeLanguage();
  },
  /* when vue component is mounted (ready) on DOM node */
  mounted: function () {
    console.debug("gc-zones! - mounted()");
    
    try {
      this.changeLanguage();
    } catch (ex) {}

    // init date pickers
    this.startdateCalendar = new bulmaCalendar( document.getElementById( 'inpstartdate_'+this.gcWidgetId ), {
      startDate: new Date(), // Date selected by default
      dateFormat: 'yyyy-mm-dd', // the date format `field` value
      lang: this.gcLanguage, // internationalization
      overlay: false,
      closeOnOverlayClick: true,
      closeOnSelect: true,
      // callback functions
      onSelect: function (e) { 
                  // hack +1 day
                  var a = new Date(e.valueOf() + 1000*3600*24);
                  this.startDate = a.toISOString().split("T")[0]; //ISO String splits at T between date and time
                  }.bind(this),
    });
    this.enddateCalendar = new bulmaCalendar( document.getElementById( 'inpenddate_'+this.gcWidgetId ), {
      startDate: new Date(), // Date selected by default
      dateFormat: 'yyyy-mm-dd', // the date format `field` value
      lang: this.gcLanguage, // internationalization
      overlay: false,
      closeOnOverlayClick: true,
      closeOnSelect: true,
      // callback functions
      onSelect: function (e) { 
                  // hack +1 day
                  var a = new Date(e.valueOf() + 1000*3600*24);
                  this.endDate = a.toISOString().split("T")[0]; //ISO String splits at T between date and time
                  }.bind(this),
    });

  },
  computed: {
    availableOptions: {
      get: function() {
        return (this.gcAvailableOptions.split(","));
      }
    },
    currentLanguage: {
      get: function() {
        // will always reflect prop's value 
        return this.gcLanguage;
      },
    },
    startDate: {
      get: function() {
        // will always reflect prop's value 
        return this.gcStartdate;
      },
      set: function(value) {
        this.$root.$emit("startdateChange", value);
      }
    },
    endDate: {
      get: function() {
        // will always reflect prop's value 
        return this.gcEnddate;
      },
      set: function(value) {
        this.$root.$emit("enddateChange", value);
      }
    },
  },
  watch: {
    currentLanguage(newValue, oldValue) {
      this.changeLanguage();
    },
    pixelSize(newValue, oldValue) {
      this.$root.$emit("pixelsizeChange", newValue);
    }
  },
  methods: {  
    toggleZones() {
      this.gcWidgetCollapsed = !this.gcWidgetCollapsed;
    },
    changeLanguage() {
      this.$i18n.locale = this.currentLanguage;
    },
    getZones() {
      console.debug("zones.getZones()")
      this.$root.$emit('getZones');
    }
  }
});
