package com.roundtablearts.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class ApiServer {

    private static final int PORT = 8080;

    private static final String GAMES_JSON = """
        [
          {
            "id": "riftbreaker",
            "title": "Riftbreaker: Fractured Timelines",
            "description": "Time-travel action shooter. Alter history across eras as super-soldier Thorne Kane.",
            "status": "In Development",
            "image": "assets/war-hero.png",
            "steamUrl": "https://store.steampowered.com",
            "itchUrl": "https://roundtablearts.itch.io/riftbreaker"
          },
          {
            "id": "jester",
            "title": "Jester Assistant",
            "description": "A cross-platform AI companion bridging desktop and mobile workflows.",
            "status": "Available",
            "image": "assets/jester.jpg",
            "steamUrl": null,
            "itchUrl": "https://roundtablearts.itch.io/jester-assistant"
          },
          {
            "id": "chronos-horde",
            "title": "Chronos Horde: The Failed",
            "description": "Co-op endless survival against mutated serum experiments. 1–4 players.",
            "status": "Coming Soon",
            "image": "assets/war-hero.png",
            "steamUrl": "https://store.steampowered.com",
            "itchUrl": null
          }
        ]
        """;

    private static final String NEWS_JSON = """
        [
          {
            "id": 1,
            "title": "W.A.R. Campaign Structure Revealed",
            "summary": "Four chapters spanning 2003–2015 Middle East conflicts, with branching paths and multiple endings.",
            "date": "2026-05-23",
            "tag": "Dev Log"
          },
          {
            "id": 2,
            "title": "Horde Mode Playtest on Discord",
            "summary": "Join our next community playtest for Chronos Horde — sign up in the #playtests channel.",
            "date": "2026-06-10",
            "tag": "Community"
          },
          {
            "id": 3,
            "title": "Jester Assistant Android Release",
            "summary": "The mobile companion app is now available on Google Play, paired with the desktop bridge.",
            "date": "2026-06-01",
            "tag": "Release"
          }
        ]
        """;

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
        server.createContext("/api/games", jsonHandler(GAMES_JSON));
        server.createContext("/api/news", jsonHandler(NEWS_JSON));
        server.createContext("/health", exchange -> send(exchange, 200, "{\"status\":\"ok\"}"));
        server.setExecutor(null);
        server.start();
        System.out.println("Round Table Arts Java API running on http://localhost:" + PORT);
    }

    private static HttpHandler jsonHandler(String body) {
        return exchange -> {
            addCors(exchange);
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }
            send(exchange, 200, body);
        };
    }

    private static void addCors(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");
        exchange.getResponseHeaders().add("Content-Type", "application/json");
    }

    private static void send(HttpExchange exchange, int code, String body) throws IOException {
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(code, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }
}