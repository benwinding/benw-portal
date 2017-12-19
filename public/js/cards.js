// To align portal cards in grid
var grid = new Muuri('.grid', {
    dragEnabled: true,
    layoutOnInit: false,
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
    const itemWidth = itemEl.clientWidth;
    const outerMarginPx = 5;
    const columnsCount = 4;
    const totalWidthPx = (itemWidth * columnsCount) + (outerMarginPx * 2);
    gridEl.style.width = (totalWidthPx * 100 / document.body.clientWidth) + "%";

    return origRefreshDimensions.call(this);
};
