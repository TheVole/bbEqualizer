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

## Thanks
Thanks go to Myung Kil for his help in this effort. 