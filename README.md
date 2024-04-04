# html-text-rotator
A simple JavaScript + HTML + CSS based library to rotate text that's encapsulated with-in an HTML element.

## Demo
Check out the demo here.

https://github.com/compumaster/html-text-rotator/assets/1711772/c98fb5c9-afbb-401e-9336-6dc266c580ce

Also a documentation page with demo is here:
[https://compumaster.github.io/html-text-rotator](https://compumaster.github.io/html-text-rotator/)


## Usage
To use the html-text-rotator library, follow these steps:

1. Include the necessary files in your HTML document. You will need to include the script.js file, the styles.css file.
2. For the text you want to rotate, replace the text with a span, other html elements are okay too.
&lt;span id="food" class="text-rotator"
          data-options="beans|a large cucumber salad|pea|avocado toast|beets|potatoes"
          data-random="true"
          data-mode="fadeoutandreplace"
          data-rand-max-sleep="500"
          data-baseline-sleep="2000"&gt;&lt;/span&gt;

* `data-options` is required, all options needs to be separated with `|`
* `data-random` is optional, default is false, if true then randomly sorts the `data-options`
* `data-mode` is optional, default is `"fadeoutandreplace"`. Other option is `"fadeoutthenreplace"`, it changes how the transition is animated.
* `data-rand-max-sleep` is optional. Default is `0`. If set, randomly waits maximum duration in ms specified before rotating each text. This duration is added to duration specified in `data-baseline-sleep`
* `data-baseline-sleep` is optional. Default is `2000`. If set always waits before rotating each text. This duration is added to random duration specified in `data-rand-max-sleep`

## Advanced Timings
If you want to make the animation's speed of transition slower (not the actual wait between each text rotation). In CSS, we have the transition timing of `0.5` seconds. This should match the `setTimeout` duration specified in `RotateText1` and `RotateText2` methods. I didn't parameterize this because it involves changing CSS too, and I don't think there would be much demand for this.
<pre>.text-rotator {
  white-space: nowrap;
  opacity: 1;
  /* the transition durations should match the animation durations */
  transition: opacity <span style="background-color:yellow">0.5s</span> ease, width <span style="background-color:yellow">0.5s</span> ease-in-out;
  display: inline-block;
}

.text-rotator.fade-out {
  opacity: 0;
}

------------

setTimeout(() => {
  this.element.textContent = this.elementOptions[this.elementIndex];
  this.element.classList.remove("fade-out");
}, <span style="background-color:yellow">500</span>);
</pre>

Thanks Quba for making me implement this. It was fun.
