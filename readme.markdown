# BBEqualizer

BBEqualizer is a simple Angular.JS directive that allows you to control the 
height of a set of HTML elements on a web page.

##Installation

The easiest way is to use Bower:

```
bower install bb-equalizer
```

##Usage

There are 2 directives that should be added as attributes to elements:

* bb-equalizer
* bb-equalizer-part

Apply bb-equalizer to a container element (that will contain the other 
elements that possess the bb-equalizer-part attribute).

```
<div id="some-container" bb-equalizer>
....
</div>
```

Apply bb-equalizer-part to the elements within the container that you want to have the same (maximum) height.

```
<div id="an-element" bb-equalizer-part="foo">....</div>
```

and 

```
<div id="another-element" bb-equalizer-part="bar">...</div>
```

**Points to note:** The values of the bb-equalizer-part attribute should be unique and do not have to be the same as the elements ids.

Finally, you can also place an additional attribute **keep** on the bb-equalizer-part element 
when the element is on a shared part of the template and should not be removed from the 
calculation during a route change when Angular routes and ngShow directives are being used. For example, if you have a side bar menu (outside of an ngView directive) 
that should be dynamically resized based on changing elements rendered via an ngView directive, then add the **keep** attribute to the side bar menu.
 
Example:

```
<div id='side-bar-menu' bb-equalizer-part='sidemenu' keep='true'>...</div>
<div ng-show></div>
```

## Thanks
Thanks go to Myung Kil for his help in this effort. 