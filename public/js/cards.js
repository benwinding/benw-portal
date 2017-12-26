var grid = new Muuri('.grid', {
    dragEnabled: true,
    layoutOnInit: true,
    sortData: {
        id: function (item, element) {
            return parseFloat(element.children[0].textContent);
        }
    }
});

// var gridEl = document.querySelector('.grid');
// var itemEl = document.querySelector('.item');
// var origRefreshDimensions = Muuri.prototype._refreshDimensions;
// Muuri.prototype._refreshDimensions = function () {
//     const docWidthPx = window.innerWidth;
//     if(docWidthPx > 700) {
//         const itemTotalPx = itemEl.clientWidth;
//         const columnsCount = Math.floor(0.9 * Math.floor(docWidthPx / itemTotalPx));
//         const outerMargin = 10;
//         const totalWidthPx = (itemTotalPx + outerMargin) * columnsCount;
//         gridEl.style.width = totalWidthPx + "px";
//         console.log('resized: PC', {grid: gridEl.style.width, item: itemEl.style.width});
//     }
//     else {
//         gridEl.style.width = "100%";
//         console.log('resized: Mobile', {grid: gridEl.style.width, item: itemEl.style.width});
//     }
//     return origRefreshDimensions.call(this);
// };

Muuri.defaultOptions.layout.fillGaps = true;

// $("#link").click(function (ev) {
//     ev.preventDefault()
//     $(".panel").animate({
//         "width": "100vw",
//         "height": "100vh",
//         "fontSize": "10em"
//     }, 'slow', function () {
//         $(".panel").fadeTo("slow", 0, function () {
//             document.location = $("#link").attr("href");
//         })
//     });
// });