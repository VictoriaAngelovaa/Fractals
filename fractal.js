var iteration = 0;
 
function next_iteration(step) {
    if(iteration + step > 15) {
       return;
    }
    else { 
        var iterationCounter = document.getElementById("iterationCounter");

        iteration = iteration + step < 0 ? 0 : iteration + step ;
        iterationCounter.innerHTML = iteration;

        init(iteration);
    }
   
}

var init = (function () {

    var canvas,
        context = null,
        size = 0,
        angle = Math.PI / 4,
        ratio = Math.sqrt(2) / 2,
        left = 0,
        top = 0;

    function recursiveDraw(step) {
        var red = (128 - (step * 4)).toString(16),
            green = (64 + (step * 4)).toString(16),
            blue = '00';
            
        context.fillStyle = '#' + green + red + blue;

        if (step === 0) {
            context.fillRect(0, 0, size, size);
            context.strokeRect(0, 0, size, size);
        } else {
            context.fillRect(0, 0, size, size);
            context.strokeRect(0, 0, size, size);
            
            context.save();
            context.translate(0, 0);
            context.scale(ratio, ratio);
            context.rotate(- angle);
            context.translate(0, - size);
            recursiveDraw(step - 1);
            context.restore();

            context.save();
            context.translate(size, 0);
            context.scale(ratio, ratio);
            context.rotate(angle);
            context.translate(- size, - size);
            recursiveDraw(step - 1);
            context.restore();
        }
    }

    return function drawTree(iteration) {
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');

        canvas.width = 500;
        canvas.height = 500;

        size = Math.min(canvas.width / 6, canvas.height / 4);
        left = (canvas.width - size) / 2;
        top = (canvas.height / 2) + size;

        context.translate(left, top);

        context.save();
        recursiveDraw(iteration);
        context.restore();
    }

})();