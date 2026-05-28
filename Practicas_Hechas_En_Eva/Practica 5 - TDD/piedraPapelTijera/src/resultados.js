const victoria = (function(){
    const Victoria = function(){};

    Victoria.prototype.toString = function(){
        return "Victoria";
    };

    return new Victoria();
})();

const derrota = (function(){
    const Derrota = function(){};

    Derrota.prototype.toString = function(){
        return "Derrota";
    };

    return new Derrota();
})();

const empate = (function(){
    const Empate = function(){};

    Empate.prototype.toString = function(){
        return "Empate";
    };

    return new Empate();
})();

victoria.not = function(){
    return derrota;
};

derrota.not = function(){
    return victoria;
};

empate.not = function(){
    return empate;
};

module.exports = {
    victoria,
    derrota,
    empate
};