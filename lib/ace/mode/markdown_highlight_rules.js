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
var lang = require("../lib/lang");
var ActionScriptHighlightRules = require("./actionscript_highlight_rules").ActionScriptHighlightRules;
var c_cppHighlightRules = require("./c_cpp_highlight_rules").c_cppHighlightRules;
var ClojureHighlightRules = require("./clojure_highlight_rules").ClojureHighlightRules;
var CoffeeHighlightRules = require("./coffee_highlight_rules").CoffeeHighlightRules;
var CSharpHighlightRules = require("./csharp_highlight_rules").CSharpHighlightRules;
var CssHighlightRules = require("./css_highlight_rules").CssHighlightRules;
var DartHighlightRules = require("./dart_highlight_rules").DartHighlightRules;
var DiffHighlightRules = require("./diff_highlight_rules").DiffHighlightRules;
var GolangHighlightRules = require("./golang_highlight_rules").GolangHighlightRules;
var GroovyHighlightRules = require("./groovy_highlight_rules").GroovyHighlightRules;
var HamlHighlightRules = require("./haml_highlight_rules").HamlHighlightRules;
var HaxeHighlightRules = require("./haxe_highlight_rules").HaxeHighlightRules;
var HtmlHighlightRules = require("./html_highlight_rules").HtmlHighlightRules;
var JadeHighlightRules = require("./jade_highlight_rules").JadeHighlightRules;
var JavaHighlightRules = require("./java_highlight_rules").JavaHighlightRules;
var JavaScriptHighlightRules = require("./javascript_highlight_rules").JavaScriptHighlightRules;
var JspHighlightRules = require("./jsp_highlight_rules").JspHighlightRules;
var JsxHighlightRules = require("./jsx_highlight_rules").JsxHighlightRules;
var LatexHighlightRules = require("./latex_highlight_rules").LatexHighlightRules;
var LessHighlightRules = require("./less_highlight_rules").LessHighlightRules;
var LispHighlightRules = require("./lisp_highlight_rules").LispHighlightRules;
var LuaHighlightRules = require("./lua_highlight_rules").LuaHighlightRules;
var MakefileHighlightRules = require("./makefile_highlight_rules").MakefileHighlightRules;
var ObjectiveCHighlightRules = require("./objectivec_highlight_rules").ObjectiveCHighlightRules;
var OcamlHighlightRules = require("./ocaml_highlight_rules").OcamlHighlightRules;
var PerlHighlightRules = require("./perl_highlight_rules").PerlHighlightRules;
var PhpLangHighlightRules = require("./php_highlight_rules").PhpLangHighlightRules;
var PythonHighlightRules = require("./python_highlight_rules").PythonHighlightRules;
var RHighlightRules = require("./r_highlight_rules").RHighlightRules;
var RDocHighlightRules = require("./rdoc_highlight_rules").RDocHighlightRules;
var RHtmlHighlightRules = require("./rhtml_highlight_rules").RHtmlHighlightRules;
var RubyHighlightRules = require("./ruby_highlight_rules").RubyHighlightRules;
var SassHighlightRules = require("./sass_highlight_rules").SassHighlightRules;
var ScalaHighlightRules = require("./scala_highlight_rules").ScalaHighlightRules;
var SchemeHighlightRules = require("./scheme_highlight_rules").SchemeHighlightRules;
var ScssHighlightRules = require("./scss_highlight_rules").ScssHighlightRules;
var ShHighlightRules = require("./sh_highlight_rules").ShHighlightRules;
var SqlHighlightRules = require("./sql_highlight_rules").SqlHighlightRules;
var StylusHighlightRules = require("./stylus_highlight_rules").StylusHighlightRules;
var SvgHighlightRules = require("./svg_highlight_rules").SvgHighlightRules;
var TclHighlightRules = require("./tcl_highlight_rules").TclHighlightRules;
var TexHighlightRules = require("./tex_highlight_rules").TexHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var TypeScriptHighlightRules = require("./typescript_highlight_rules").TypeScriptHighlightRules;
var XmlHighlightRules = require("./xml_highlight_rules").XmlHighlightRules;
var YamlHighlightRules = require("./yaml_highlight_rules").YamlHighlightRules;

var escaped = function(ch) {
    return "(?:[^" + lang.escapeRegExp(ch) + "\\\\]|\\\\.)*";
}

function github_embed(tag, prefix) {
    return { // Github style block
        token : "support.function",
        regex : "^```" + tag + "\\s*$",
        push  : prefix + "start"
    };
}

var MarkdownHighlightRules = function() {
    HtmlHighlightRules.call(this);
    // regexp must not have capturing parentheses
    // regexps are ordered -> the first match is used

    this.$rules["start"].unshift({
        token : "empty_line",
        regex : '^$',
        next: "allowBlock"
    }, { // h1
        token: "markup.heading.1",
        regex: "^=+(?=\\s*$)"
    }, { // h2
        token: "markup.heading.2",
        regex: "^\\-+(?=\\s*$)"
    }, {
        token : function(value) {
            return "markup.heading." + value.length;
        },
        regex : /^#{1,6}(?=\s*[^ #]|\s+#.)/,
        next : "header"
    },
    github_embed("(?:as|actionscript)", "actionscript-"),
    github_embed("(?:cpp|c)", "c_cpp-"),
    github_embed("clojure", "clojure-"),
    github_embed("(?:coffeescrit|coffee)", "coffee-"),
    github_embed("csharp", "csharp-"),
    github_embed("css", "css-"),
    github_embed("dart", "dart-"),
    github_embed("diff", "diff-"),
    github_embed("(?:golang|go)", "golang-"),
    github_embed("groovy", "groovy-"),
    github_embed("haml", "haml-"),
    github_embed("haxe", "haxe-"),
    github_embed("html", "html-"),
    github_embed("jade", "jade-"),
    github_embed("java", "java-"),
    github_embed("(?:javascript|js)", "js-"),
    github_embed("jsp", "jsp-"),
    github_embed("jsx", "jsx-"),
    github_embed("latex", "latex-"),
    github_embed("less", "less-"),
    github_embed("lisp", "lisp-"),
    github_embed("lua", "lua-"),
    github_embed("makefile", "makefile-"),
    github_embed("(?:objectivec|objc)", "objectivec-"),
    github_embed("ocaml", "ocaml-"),
    github_embed("perl", "perl-"),
    github_embed("php", "php-"),
    github_embed("python", "python-"),
    github_embed("r", "r-"),
    github_embed("rdoc", "rdoc-"),
    github_embed("rhtml", "rhtml-"),
    github_embed("ruby", "ruby-"),
    github_embed("sass", "sass-"),
    github_embed("scala", "scala-"),
    github_embed("scheme", "scheme-"),
    github_embed("scss", "scss-"),
    github_embed("sh", "sh-"),
    github_embed("sql", "sql-"),
    github_embed("stylus", "stylus-"),
    github_embed("svg", "svg-"),
    github_embed("tcl", "tcl-"),
    github_embed("tex", "tex-"),
    github_embed("(?:typescript|ts)", "typescript-"),
    github_embed("xml", "xml-"),
    github_embed("yaml", "yaml-"),
    { // Github style block
        token : "support.function",
        regex : "^```\\s*[a-zA-Z]*(?:{.*?\\})?\\s*$",
        next  : "githubblock"
    }, { // block quote
        token : "string",
        regex : "^>[ ].+$",
        next  : "blockquote"
    }, { // HR * - _
        token : "constant",
        regex : "^ {0,2}(?:(?: ?\\* ?){3,}|(?: ?\\- ?){3,}|(?: ?\\_ ?){3,})\\s*$",
        next: "allowBlock"
    }, { // list
        token : "markup.list",
        regex : "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",
        next  : "listblock-start"
    }, {
        include : "basic"
    });

    this.addRules({
        "basic" : [{
            token : "constant.language.escape",
            regex : /\\[\\`*_{}\[\]()#+\-.!]/
        }, { // code span `
            token : "support.function",
            regex : "(`+)(.*?[^`])(\\1)"
        }, { // reference
            token : ["text", "constant", "text", "url", "string", "text"],
            regex : "^([ ]{0,3}\\[)([^\\]]+)(\\]:\\s*)([^ ]+)(\\s*(?:[\"][^\"]+[\"])?(\\s*))$"
        }, { // link by reference
            token : ["text", "string", "text", "constant", "text"],
            regex : "(\\[)(" + escaped("]") + ")(\\]\s*\\[)("+ escaped("]") + ")(\\])"
        }, { // link by url
            token : ["text", "string", "text", "markup.underline", "string", "text"],
            regex : "(\\[)(" +                                        // [
                    escaped("]") +                                    // link text
                    ")(\\]\\()"+                                      // ](
                    '((?:[^\\)\\s\\\\]|\\\\.|\\s(?=[^"]))*)' +        // href
                    '(\\s*"' +  escaped('"') + '"\\s*)?' +            // "title"
                    "(\\))"                                           // )
        }, { // strong ** __
            token : "string",
            regex : "([*]{2}|[_]{2}(?=\\S))(.*?\\S[*_]*)(\\1)"
        }, { // emphasis * _
            token : "string",
            regex : "([*]|[_](?=\\S))(.*?\\S[*_]*)(\\1)"
        }, { //
            token : ["text", "url", "text"],
            regex : "(<)("+
                      "(?:https?|ftp|dict):[^'\">\\s]+"+
                      "|"+
                      "(?:mailto:)?[-.\\w]+\\@[-a-z0-9]+(?:\\.[-a-z0-9]+)*\\.[a-z]+"+
                    ")(>)"
        }],

        // code block
        "allowBlock": [
            {token : "support.function", regex : "^ {4}.+", next : "allowBlock"},
            {token : "empty", regex : "", next : "start"}
        ],

        "header" : [{
            regex: "$",
            next : "start"
        }, {
            include: "basic"
        }, {
            defaultToken : "heading"
        } ],

        "listblock-start" : [{
            token : "support.variable",
            regex : /(?:\[[ x]\])?/,
            next  : "listblock"
        }],

        "listblock" : [ { // Lists only escape on completely blank lines.
            token : "empty_line",
            regex : "^$",
            next  : "start"
        }, { // list
            token : "markup.list",
            regex : "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",
            next  : "listblock-start"
        }, {
            include : "basic", noEscape: true
        }, {
            defaultToken : "list"
        } ],

        "blockquote" : [ { // BLockquotes only escape on blank lines.
            token : "empty_line",
            regex : "^\\s*$",
            next  : "start"
        }, {
            token : "string",
            regex : ".+"
        } ],

        "githubblock" : [ {
            token : "support.function",
            regex : "^```",
            next  : "start"
        }, {
            token : "support.function",
            regex : ".+"
        } ]
    });

    [
        [ActionScriptHighlightRules, "actionscript-"],
        [c_cppHighlightRules, "c_cpp-"],
        [ClojureHighlightRules, "clojure-"],
        [CoffeeHighlightRules, "coffee-"],
        [CSharpHighlightRules, "csharp-"],
        [CssHighlightRules, "css-"],
        [DartHighlightRules, "dart-"],
        [DiffHighlightRules, "diff-"],
        [GolangHighlightRules, "golang-"],
        [GroovyHighlightRules, "groovy-"],
        [HamlHighlightRules, "haml-"],
        [HaxeHighlightRules, "haxe-"],
        [HtmlHighlightRules, "html-"],
        [JadeHighlightRules, "jade-"],
        [JavaHighlightRules, "java-"],
        [JavaScriptHighlightRules, "js-"],
        [JspHighlightRules, "jsp-"],
        [JsxHighlightRules, "jsx-"],
        [LatexHighlightRules, "latex-"],
        [LessHighlightRules, "less-"],
        [LispHighlightRules, "lisp-"],
        [LuaHighlightRules, "lua-"],
        [MakefileHighlightRules, "makefile-"],
        [ObjectiveCHighlightRules, "objectivec-"],
        [OcamlHighlightRules, "ocaml-"],
        [PerlHighlightRules, "perl-"],
        [PhpLangHighlightRules, "php-"],
        [PythonHighlightRules, "python-"],
        [RHighlightRules, "r-"],
        [RDocHighlightRules, "rdoc-"],
        [RHtmlHighlightRules, "rhtml-"],
        [RubyHighlightRules, "ruby-"],
        [SassHighlightRules, "sass-"],
        [ScalaHighlightRules, "scala-"],
        [SchemeHighlightRules, "scheme-"],
        [ScssHighlightRules, "scss-"],
        [ShHighlightRules, "sh-"],
        [SqlHighlightRules, "sql-"],
        [StylusHighlightRules, "stylus-"],
        [SvgHighlightRules, "svg-"],
        [TclHighlightRules, "tcl-"],
        [TexHighlightRules, "tex-"],
        [TypeScriptHighlightRules , "typescript-"],
        [XmlHighlightRules, "xml-"],
        [YamlHighlightRules, "yaml-"]
    ].forEach(function(v){
        this.embedRules(v[0], v[1], [{
            token : "support.function",
            regex : "^```",
            next  : "start"
        }]);
    }.bind(this));

    this.normalizeRules();
};
oop.inherits(MarkdownHighlightRules, TextHighlightRules);

exports.MarkdownHighlightRules = MarkdownHighlightRules;
});
