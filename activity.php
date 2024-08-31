<?php

$table = array(
    "header" => array(
        "Student ID",
        "LastName",
        "MiddleName",
        "FirstName",
        "Course",
        "Section"
    ),
    "body" => array(
        array(
            "lastName" => "lastName",
            "middleName" => "middleName",
            "firstName" => "firstName",
            "course" => "BSCS",
            "section" => "3A"

        ),
        array(
            "lastName" => "lastName",
            "middleName" => "middleName",
            "firstName" => "firstName",
            "course" => "BSCS",
            "section" => "3A"

        ),
        array(
            "lastName" => "lastName",
            "middleName" => "middleName",
            "firstName" => "firstName",
            "course" => "BSCS",
            "section" => "3A"

        ),
        array(
            "lastName" => "lastName",
            "middleName" => "middleName",
            "firstName" => "firstName",
            "course" => "BSCS",
            "section" => "3A"

        ),
        array(
            "lastName" => "lastName",
            "middleName" => "middleName",
            "firstName" => "firstName",
            "course" => "BSCS",
            "section" => "3A"

        ),
        array(
            "lastName" => "lastName",
            "middleName" => "middleName",
            "firstName" => "firstName",
            "course" => "BSCS",
            "section" => "3A"

        ),
        array(
            "lastName" => "lastName",
            "middleName" => "middleName",
            "firstName" => "firstName",
            "course" => "BSCS",
            "section" => "3A"

        ),
        array(
            "lastName" => "lastName",
            "middleName" => "middleName",
            "firstName" => "firstName",
            "course" => "BSCS",
            "section" => "3A"

        ),
        array(
            "lastName" => "lastName",
            "middleName" => "middleName",
            "firstName" => "firstName",
            "course" => "BSCS",
            "section" => "3A"

        ),
        array(
            "lastName" => "lastName",
            "middleName" => "middleName",
            "firstName" => "firstName",
            "course" => "BSCS",
            "section" => "3A"

        ),
    )
);
echo("<table>");

echo("<thead><tr>");
foreach ($table["header"] as $header) {
    echo("<th>$header</th>");
}
echo("</tr></thead>");

echo("<tbody>");
$student_id = 1;

foreach ($table["body"] as $row) {
    echo("<tr>");
    echo("<td>$student_id</td>");
    echo("<td>" . $row["lastName"] . "</td>");
    echo("<td>" . $row["middleName"] . "</td>");
    echo("<td>" . $row["firstName"] . "</td>");
    echo("<td>" . $row["course"] . "</td>");
    echo("<td>" . $row["section"] . "</td>");
    echo("</tr>");
    $student_id++;
}
echo("</tbody>");

echo("</table>");
?>
