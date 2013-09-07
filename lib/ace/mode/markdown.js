/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");

var ActionScriptMode = require("./actionscript").Mode;
var AssemblyX86Mode = require("./assembly_x86").Mode;
var c_cppMode = require("./c_cpp").Mode;
var ClojureMode = require("./clojure").Mode;
var CoffeeMode = require("./coffee").Mode;
var CSharpMode = require("./csharp").Mode;
var CssMode = require("./css").Mode;
var DartMode = require("./dart").Mode;
var DiffMode = require("./diff").Mode;
var GolangMode = require("./golang").Mode;
var GroovyMode = require("./groovy").Mode;
var HamlMode = require("./haml").Mode;
var HaxeMode = require("./haxe").Mode;
var HtmlMode = require("./html").Mode;
var JadeMode = require("./jade").Mode;
var JavaMode = require("./java").Mode;
var JavaScriptMode = require("./javascript").Mode;
var JspMode = require("./jsp").Mode;
var JsxMode = require("./jsx").Mode;
var LatexMode = require("./latex").Mode;
var LessMode = require("./less").Mode;
var LispMode = require("./lisp").Mode;
var LuaMode = require("./lua").Mode;
var MakefileMode = require("./makefile").Mode;
var ObjectiveCMode = require("./objectivec").Mode;
var OcamlMode = require("./ocaml").Mode;
var PerlMode = require("./perl").Mode;
var PhpMode = require("./php").Mode;
var PythonMode = require("./python").Mode;
var RMode = require("./r").Mode;
var RDocMode = require("./rdoc").Mode;
var RHtmlMode = require("./rhtml").Mode;
var RubyMode = require("./ruby").Mode;
var SassMode = require("./sass").Mode;
var ScalaMode = require("./scala").Mode;
var SchemeMode = require("./scheme").Mode;
var ScssMode = require("./scss").Mode;
var ShMode = require("./sh").Mode;
var SqlMode = require("./sql").Mode;
var StylusMode = require("./stylus").Mode;
var SvgMode = require("./svg").Mode;
var TclMode = require("./tcl").Mode;
var TexMode = require("./tex").Mode;
var TextMode = require("./text").Mode;
var TypeScriptMode = require("./typescript").Mode;
var XmlMode = require("./xml").Mode;
var YamlMode = require("./yaml").Mode;

var Tokenizer = require("../tokenizer").Tokenizer;
var MarkdownHighlightRules = require("./markdown_highlight_rules").MarkdownHighlightRules;
var MarkdownFoldMode = require("./folding/markdown").FoldMode;

var Mode = function() {
    var highlighter = new MarkdownHighlightRules();
    
    this.$tokenizer = new Tokenizer(highlighter.getRules());
    this.$embeds = highlighter.getEmbeds();
    this.createModeDelegates({
        "actionscript-": ActionScriptMode,
        "c_cpp-": c_cppMode,
        "clojure-": ClojureMode,
        "coffee-": CoffeeMode,
        "csharp-": CSharpMode,
        "css-": CssMode,
        "dart-": DartMode,
        "diff-": DiffMode,
        "golang-": GolangMode,
        "groovy-": GroovyMode,
        "haml-": HamlMode,
        "haxe-": HaxeMode,
        "html-": HtmlMode,
        "jade-": JadeMode,
        "java-": JavaMode,
        "js-": JavaScriptMode,
        "jsp-": JspMode,
        "jsx-": JsxMode,
        "latex-": LatexMode,
        "less-": LessMode,
        "lisp-": LispMode,
        "lua-": LuaMode,
        "makefile-": MakefileMode,
        "objectivec-": ObjectiveCMode,
        "ocaml-": OcamlMode,
        "perl-": PerlMode,
        "php-": PhpMode,
        "python-": PythonMode,
        "r-": RMode,
        "rdoc-": RDocMode,
        "rhtml-": RHtmlMode,
        "ruby-": RubyMode,
        "sass-": SassMode,
        "scala-": ScalaMode,
        "scheme-": SchemeMode,
        "scss-": ScssMode,
        "sh-": ShMode,
        "sql-": SqlMode,
        "stylus-": StylusMode,
        "svg-": SvgMode,
        "tcl-": TclMode,
        "tex-": TexMode,
        "typescript-": TypeScriptMode,
        "xml-": XmlMode,
        "yaml-": YamlMode
    });
    
    this.foldingRules = new MarkdownFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.type = "text";
    this.lineCommentStart = ">";
    
    this.getNextLineIndent = function(state, line, tab) {
        if (state == "listblock") {
            var match = /^(\s*)(?:([-+*])|(\d+)\.)(\s+)/.exec(line);
            if (!match)
                return "";
            var marker = match[2];
            if (!marker)
                marker = parseInt(match[3], 10) + 1 + ".";
            return match[1] + marker + match[4];
        } else {
            return this.$getIndent(line);
        }
    };
}).call(Mode.prototype);

exports.Mode = Mode;
});
