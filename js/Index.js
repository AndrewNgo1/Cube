var drag = false;
var lastX;
var lastY;
var timeout;

var rotation = [[1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]];

$(function () {
    $(document).mousedown(function (e) {
        drag = true;
        lastX = e.pageX;
        lastY = e.pageY;
    });

    $(document).mousemove(function (e) {
        if (drag) {
            var yRotation = (e.pageX - lastX) / 360 * Math.PI;
            var xRotation = (e.pageY - lastY) / -360 * Math.PI;

            var rotationMatrix = matrixMultiply(
                                   [
                                       [Math.cos(yRotation), 0, -Math.sin(yRotation), 0],
                                       [0, 1, 0, 0],
                                       [Math.sin(yRotation), 0, Math.cos(yRotation), 0],
                                       [0, 0, 0, 1]
                                   ],
                                   [
                                       [1, 0, 0, 0],
                                       [0, Math.cos(xRotation), Math.sin(xRotation), 0],
                                       [0, -Math.sin(xRotation), Math.cos(xRotation), 0],
                                       [0, 0, 0, 1]
                                   ]
                                );

            rotation = matrixMultiply(rotation, rotationMatrix);
            $("#cube").css("transform", "matrix3d(" + rotation[0][0] + "," + rotation[0][1] + "," + rotation[0][2] + "," + rotation[0][3] + "," +
                                                      rotation[1][0] + "," + rotation[1][1] + "," + rotation[1][2] + "," + rotation[1][3] + "," +
                                                      rotation[2][0] + "," + rotation[2][1] + "," + rotation[2][2] + "," + rotation[2][3] + "," +
                                                      rotation[0][3] + "," + rotation[3][1] + "," + rotation[3][2] + "," + rotation[3][3] + ")");
            lastX = e.pageX;
            lastY = e.pageY;
        }
    });

    $(document).mouseup(function () {
        drag = false;
    });
});

function matrixMultiply(m1, m2) {
    return [
        [
            dotProduct([m1[0][0], m1[0][1], m1[0][2], m1[0][3]], [m2[0][0], m2[1][0], m2[2][0], m2[3][0]]),
            dotProduct([m1[0][0], m1[0][1], m1[0][2], m1[0][3]], [m2[0][1], m2[1][1], m2[2][1], m2[3][1]]),
            dotProduct([m1[0][0], m1[0][1], m1[0][2], m1[0][3]], [m2[0][2], m2[1][2], m2[2][2], m2[3][2]]),
            dotProduct([m1[0][0], m1[0][1], m1[0][2], m1[0][3]], [m2[0][3], m2[1][3], m2[2][3], m2[3][3]])
        ],
        [
            dotProduct([m1[1][0], m1[1][1], m1[1][2], m1[1][3]], [m2[0][0], m2[1][0], m2[2][0], m2[3][0]]),
            dotProduct([m1[1][0], m1[1][1], m1[1][2], m1[1][3]], [m2[0][1], m2[1][1], m2[2][1], m2[3][1]]),
            dotProduct([m1[1][0], m1[1][1], m1[1][2], m1[1][3]], [m2[0][2], m2[1][2], m2[2][2], m2[3][2]]),
            dotProduct([m1[1][0], m1[1][1], m1[1][2], m1[1][3]], [m2[0][3], m2[1][3], m2[2][3], m2[3][3]])
        ],
        [
            dotProduct([m1[2][0], m1[2][1], m1[2][2], m1[2][3]], [m2[0][0], m2[1][0], m2[2][0], m2[3][0]]),
            dotProduct([m1[2][0], m1[2][1], m1[2][2], m1[2][3]], [m2[0][1], m2[1][1], m2[2][1], m2[3][1]]),
            dotProduct([m1[2][0], m1[2][1], m1[2][2], m1[2][3]], [m2[0][2], m2[1][2], m2[2][2], m2[3][2]]),
            dotProduct([m1[2][0], m1[2][1], m1[2][2], m1[2][3]], [m2[0][3], m2[1][3], m2[2][3], m2[3][3]])
        ],
        [
            dotProduct([m1[3][0], m1[3][1], m1[3][2], m1[3][3]], [m2[0][0], m2[1][0], m2[2][0], m2[3][0]]),
            dotProduct([m1[3][0], m1[3][1], m1[3][2], m1[3][3]], [m2[0][1], m2[1][1], m2[2][1], m2[3][1]]),
            dotProduct([m1[3][0], m1[3][1], m1[3][2], m1[3][3]], [m2[0][2], m2[1][2], m2[2][2], m2[3][2]]),
            dotProduct([m1[3][0], m1[3][1], m1[3][2], m1[3][3]], [m2[0][3], m2[1][3], m2[2][3], m2[3][3]])
        ],
    ]
}

function dotProduct(m1, m2) {
    return m1[0] * m2[0] + m1[1] * m2[1] + m1[2] * m2[2] + m1[3] * m2[3];
}