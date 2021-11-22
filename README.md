# gc-zones-control
## Description
gc-zones-control is an JavaScript/HTML widget for interacting with the ag|knowledge REST API from geocledian.
## Purpose
With this widget you have a UI for interacting with the zones endpoint of the REST API of ag|knowledge from geocledian.com. The widget just provides a UI for start- and enddate and the pixel size for the zones endpoint.

## Configuration
This widget is customizeable via HTML attributes and supports the setting of the following attributes.

### Basic options
- gc-startdate: date as simple ISO date string to set the startdate of an aggregate API product, e.g. '2020-03-01' or "$root.startdate"; default: ""
- gc-enddate: date as simple ISO date string to set the enddate of an aggregate API product, e.g. '2020-10-01' or "$root.enddate"; default: ""
- gc-language: initial locale language for translation, e.g. "en" for english; default: "en"

### UI options
- gc-layout: layout of the content of the widget, e.g. "horizontal" or "vertical"; default: "vertical"
- gc-available-options: limit the available options, e.g. "" for not title at all; default: "widgetTitle"
- gc-widget-collapsed: start the widget collapsed or not; default: "false"

## Integration
This widget should be integrated with a root Vue instance together with `gc-zones-map` and / or `gc-zones-chart`. 
For the integration of the widget you'll have to follow two steps.

You have to add some dependencies in the head tag of the container website.

```html
<html>
  <head>

    <!--GC zones-chart component begin -->

    <!-- loads also dependent css files via @import -->
    <link href="css/gc-zones-control.css" rel="stylesheet">
    <!-- init script for components -->
    <script type="text/javascript" src="js/gc-zones-control.js"></script> 
     
    <!--GC zones-chart component end -->
  </head>

```

Then you may create the widget(s) with custom HTML tags anywhere in the body section of the website. Make sure to use an unique identifier for each chart component.

## Support
Please contact [us](mailto:info@geocledian.com) from geocledian.com if you have troubles using the widget!

## Used Libraries
- [Vue.js](https://www.vuejs.org)
- [Vue I18n](https://kazupon.github.io/vue-i18n/)
- [Bulma](https://bulma.io/documentation/)
- [Font awesome](https://fontawesome.com/)