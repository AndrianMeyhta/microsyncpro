package store

import (
	"context"
	"fmt"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

type User struct {
	ID       string `json:"id"`
	Email    string `json:"email"`	
	PasswordHash string `json:"-"` // Exclude from JSON output
}

type UserStore struct {
	pool *pgxpool.Pool
}

func NewUserStore(connStr string) (*UserStore, error) {
	pool, err := pgxpool.New(context.Background(), connStr)
	if err != nil {
		return nil, fmt.Errorf("unable to create connection pool: %w", err)
	}

	// Ping the database to ensure connection is established
	err = pool.Ping(context.Background())
	if err != nil {
		return nil, fmt.Errorf("unable to connect to database: %w", err)
	}

	log.Println("Successfully connected to PostgreSQL database!")
	return &UserStore{pool: pool}, nil
}

func (s *UserStore) Close() {
	s.pool.Close()
}

func (s *UserStore) GetUserByEmail(email string) (*User, error) {
	var user User
	query := "SELECT id, email, password_hash FROM users WHERE email = $1"
	err := s.pool.QueryRow(context.Background(), query, email).Scan(&user.ID, &user.Email, &user.PasswordHash)
	if err != nil {
		return nil, fmt.Errorf("error getting user by email: %w", err)
	}
	return &user, nil
}

func (s *UserStore) CreateUser(email, passwordHash string) (*User, error) {
	var user User
	query := "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, password_hash"
	err := s.pool.QueryRow(context.Background(), query, email, passwordHash).Scan(&user.ID, &user.Email, &user.PasswordHash)
	if err != nil {
		return nil, fmt.Errorf("error creating user: %w", err)
	}
	return &user, nil
}
