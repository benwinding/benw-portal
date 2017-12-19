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
    const qdocWidthPx = document.body.clientWidth;
    if(qdocWidthPx > 700) {
        const qitemWidthPx = itemEl.clientWidth;
        const outerMarginPx = 5;
        const columnsCount = Math.floor(qdocWidthPx / qitemWidthPx);
        const totalWidthPx = (qitemWidthPx * columnsCount) + (outerMarginPx * 2);
        gridEl.style.width = (totalWidthPx * 100 / qdocWidthPx) + "%";
    }

    return origRefreshDimensions.call(this);
};
