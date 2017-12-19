// To align portal cards in grid
var grid = new Muuri('.grid', {
    dragEnabled: true,
    layoutOnInit: true,
    sortData: {
        id: function (item, element) {
            return parseFloat(element.children[0].textContent);
        }
    }
});

// Adjusting container width to resize to align with cards exactly
var  gridEl = document.querySelector('.grid');
var  itemEl = document.querySelector('.item');
var  origRefreshDimensions = Muuri.prototype._refreshDimensions;
Muuri.prototype._refreshDimensions = function () {
    const docWidthPx = document.body.clientWidth;
    if(docWidthPx > 700) {
        const itemWidthPx = itemEl.clientWidth;
        const outerMarginPx = 5;
        const columnsCount = Math.floor(0.9 * Math.floor(docWidthPx / itemWidthPx));
        const totalWidthPx = (itemWidthPx * columnsCount) + (outerMarginPx * 2);
        gridEl.style.width = (totalWidthPx * 100 / docWidthPx) + "%";
    }
    else {
        gridEl.style.width = "auto";
    }

    return origRefreshDimensions.call(this);
};
