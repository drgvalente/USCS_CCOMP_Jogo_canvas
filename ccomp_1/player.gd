extends CharacterBody3D

var speed = 5


func _process(delta: float) -> void:
	if Input.is_key_pressed(KEY_LEFT):
		translate(Vector3.LEFT * speed * delta)
		
	if Input.is_key_pressed(KEY_RIGHT):
		translate(Vector3.RIGHT * speed * delta)
		
	if Input.is_key_pressed(KEY_UP):
		translate(Vector3.FORWARD * speed * delta)
		
	if Input.is_key_pressed(KEY_DOWN):
		translate(Vector3.BACK * speed * delta)
		
		
