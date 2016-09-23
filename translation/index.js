'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var intializeTranslation = exports.intializeTranslation = function intializeTranslation(i18nextProject) {
    var language = arguments.length <= 1 || arguments[1] === undefined ? 'fr-FR' : arguments[1];
    var resources = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    i18nextProject.init({
        lng: language,
        resources: _defineProperty({}, language, {
            translation: resources.reduce(function (acc, newValue) {
                return Object.assign(acc, newValue);
            }, {})
        })
    }, function (err, t) {
        console.info('[FOCUS-APPLICATION] Translation initialized !');
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImludGlhbGl6ZVRyYW5zbGF0aW9uIiwiaTE4bmV4dFByb2plY3QiLCJsYW5ndWFnZSIsInJlc291cmNlcyIsImluaXQiLCJsbmciLCJ0cmFuc2xhdGlvbiIsInJlZHVjZSIsImFjYyIsIm5ld1ZhbHVlIiwiT2JqZWN0IiwiYXNzaWduIiwiZXJyIiwidCIsImNvbnNvbGUiLCJpbmZvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVPLElBQU1BLHNEQUF1QixTQUF2QkEsb0JBQXVCLENBQUNDLGNBQUQsRUFBd0Q7QUFBQSxRQUF2Q0MsUUFBdUMseURBQTVCLE9BQTRCO0FBQUEsUUFBbkJDLFNBQW1CLHlEQUFQLEVBQU87O0FBQ3hGRixtQkFBZUcsSUFBZixDQUFvQjtBQUNoQkMsYUFBS0gsUUFEVztBQUVoQkMsdUNBQ0dELFFBREgsRUFDZTtBQUNYSSx5QkFBY0gsVUFBVUksTUFBVixDQUFrQixVQUFDQyxHQUFELEVBQU1DLFFBQU47QUFBQSx1QkFBbUJDLE9BQU9DLE1BQVAsQ0FBY0gsR0FBZCxFQUFtQkMsUUFBbkIsQ0FBbkI7QUFBQSxhQUFsQixFQUFtRSxFQUFuRTtBQURILFNBRGY7QUFGZ0IsS0FBcEIsRUFPRyxVQUFDRyxHQUFELEVBQU1DLENBQU4sRUFBWTtBQUNYQyxnQkFBUUMsSUFBUixDQUFhLCtDQUFiO0FBQ0gsS0FURDtBQVVILENBWE0iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmV4cG9ydCBjb25zdCBpbnRpYWxpemVUcmFuc2xhdGlvbiA9IChpMThuZXh0UHJvamVjdCwgbGFuZ3VhZ2UgPSAnZnItRlInLCByZXNvdXJjZXMgPSBbXSkgPT4ge1xyXG4gICAgaTE4bmV4dFByb2plY3QuaW5pdCh7XHJcbiAgICAgICAgbG5nOiBsYW5ndWFnZSxcclxuICAgICAgICByZXNvdXJjZXM6IHtcclxuICAgICAgICAgIFtsYW5ndWFnZV0gOiB7XHJcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uIDogcmVzb3VyY2VzLnJlZHVjZSggKGFjYywgbmV3VmFsdWUpID0+IE9iamVjdC5hc3NpZ24oYWNjLCBuZXdWYWx1ZSksIHt9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIChlcnIsIHQpID0+IHtcclxuICAgICAgICBjb25zb2xlLmluZm8oJ1tGT0NVUy1BUFBMSUNBVElPTl0gVHJhbnNsYXRpb24gaW5pdGlhbGl6ZWQgIScpO1xyXG4gICAgfSk7XHJcbn07XHJcbiJdfQ==