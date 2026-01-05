<?php
if (!defined('MODX_BASE_PATH')) {
	http_response_code(403);
	die('For');
}

$e = &$modx->event;
$params = $e->params;

$params["leftPad"] = $params["leftPad"] ? (int) $params["leftPad"] : 4;
$params["leftPad"] = $params["leftPad"] > 4 ? $params["leftPad"] : 4;
// Файл теста (смотрим что в событиях)
$file = dirname(__FILE__) . "/params.txt";

switch ($e->name) {
	/**
	 * Создание директорий
	 */
	case "OnDocFormRender":
	case "onAfterMoveDocument":
	case "OnDocFormSave":
	case "OnDocDuplicate":
		/**
		 * OnDocFormRender
			Array
			(
			    [id] => 1
			    [template] => 3
			    [leftPad] => 4
			)
		 *
		 * onAfterMoveDocument
			Array
			(
			    [id_document] => 1
			    [old_parent] => 0
			    [new_parent] => 2
			    [leftPad] => 4
			)
		 *
		 * OnDocFormSave
			Array
			(
			    [mode] => upd
			    [id] => 1
			    [leftPad] => 4
			)
		 *
		 * OnDocDuplicate
			Array
			(
			    [id] => 2
			    [new_id] => 3
			    [leftPad] => 4
			)
		 */
		// Получаем id документа
		$id = $params['id'] ? (int) $params['id'] : ($params['id_document'] ? (int) $params['id_document'] : 0);
		// Получаем путь assets согласно настроек сайта (у каждого менеджера может быть свой)
		if($id):
			// Получаем путь согласно дерева сайта
			// Создаём директорию в директориях files, images, media
		endif;
		break;
	/**
	 * Удаление пустых директорий при входе/выходе
	 */
	case "OnManagerLogin":
	case "OnManagerLogout":
		break;
}
