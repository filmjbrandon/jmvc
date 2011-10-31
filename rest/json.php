<?php

/**
 * PHP REST SQL JSON renderer class
 * This class renders the REST response data as JSON.
 * Raphael Sergio (raphaelsergio@gmail.com) July 2011
 */
class PHPRestSQLRenderer {
   
    /**
     * @var PHPRestSQL PHPRestSQL
     */
    var $PHPRestSQL;
   
    /**
     * Constructor. Takes an output array and calls the appropriate handler.
     * @param PHPRestSQL PHPRestSQL
     */
    function render($PHPRestSQL) {
        $this->PHPRestSQL = $PHPRestSQL;
        switch($PHPRestSQL->display) {
            case 'database':
                $this->database();
                break;
            case 'table':
                $this->table();
                break;
            case 'row':
                $this->row();
                break;
        }
    }

    
    /**
     * Output the top level table listing.
     */
    function database() {
        header('Content-Type: application/json');
        if (isset($this->PHPRestSQL->output['database'])) {
			echo json_encode($this->PHPRestSQL->output['database']);
        }
    }
    
    /**
     * Output the rows within a table.
     */
    function table() {
        header('Content-Type: application/json');
        if (isset($this->PHPRestSQL->output['table'])) {
			echo json_encode($this->PHPRestSQL->output['table']); 
        }
    }
    
    /**
     * Output the entry in a table row.
     */
    function row() {
        header('Content-Type: application/json');
        if (isset($this->PHPRestSQL->output['row'])) {
			echo json_encode($this->PHPRestSQL->output['row']);
        }
    }

}