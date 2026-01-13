<?php
/**
 * TinyMCE4CSS
 *
 * Закрепление Блока инструментов TinyMCE.
 *
 * @category     plugin
 * @version      2.0.0
 * @package      evo
 * @internal     @events OnRichTextEditorInit
 * @internal     @modx_category Utilites
 * @internal     @installset base
 * @internal     @disabled 0
 * @homepage     https://github.com/ProjectSoft-STUDIONIONS/DirectoryUtilites#readme
 * @license      https://github.com/ProjectSoft-STUDIONIONS/DirectoryUtilites/blob/master/LICENSE GNU General Public License v3.0 (GPL-3.0)
 * @reportissues https://github.com/ProjectSoft-STUDIONIONS/DirectoryUtilites/issues
 * @author       Чернышёв Андрей aka ProjectSoft <projectsoft2009@yandex.ru>
 * @lastupdate   2026-01-13
 */

if (!defined('MODX_BASE_PATH')):
	http_response_code(403);
	die('For');
endif;

$e = &$modx->event;
$params = $e->params;

switch($e->name){
	case "OnRichTextEditorInit":
		$output = <<<EOD
<style>.mce-container-body .mce-top-part {top: 0;position: sticky;}</style>
EOD;
		$modx->event->output($output);
		break;
}
?>
