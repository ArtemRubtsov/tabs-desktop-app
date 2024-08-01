#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use rusqlite::{params, Connection, Result};
use tauri::Builder;
use std::path::PathBuf;




fn main() {
    let mut db_path = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    db_path.push("db.sqlite");

    // Инициализация базы данных
    let conn = Connection::open(&db_path).expect("Failed to open database");
    conn.execute(
        "CREATE TABLE IF NOT EXISTS users (
                  id INTEGER PRIMARY KEY,
                  name TEXT NOT NULL UNIQUE,
                  password TEXT NOT NULL
                  )",
        [],
    ).expect("Failed to create table");

    Builder::default()
        .invoke_handler(tauri::generate_handler![create_user, authorize_user])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn create_user(name: String, password: String) -> Result<String, String> {
    let mut db_path = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    db_path.push("db.sqlite");

    let conn = Connection::open(&db_path).map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO users (name, password) VALUES (?1, ?2)",
        params![name, password],
    ).map_err(|e| e.to_string())?;
    Ok("User created successfully".into())
}

#[tauri::command]
fn authorize_user(name: String, password: String) -> Result<String, String> {
    let mut db_path = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    db_path.push("db.sqlite");

    let conn = Connection::open(&db_path).map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare("SELECT * FROM users WHERE name = ?1 AND password = ?2").map_err(|e| e.to_string())?;
    let mut rows = stmt.query(params![name, password]).map_err(|e| e.to_string())?;

    if let Some(_) = rows.next().map_err(|e| e.to_string())? {
        Ok("Authorization successful".into())
    } else {
        Err("Invalid credentials".into())
    }
}


